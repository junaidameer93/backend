import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {Playlist} from "../models/playlist.model.js";

const getUserPlayList = asyncHandler(async (req, res) => {

    const {userId} = req.params;
    if(!userId){
        throw new ApiError(402,"User id is required")
    }

    const playlist = await Playlist.find({owner:userId})
    if(!playlist){
        throw new ApiError(404,"Playlist not found")
    }

    return res.status(200).json(new ApiResponse(200, playlist, "Playlist fetched successfully"))


})

const createPlayList = asyncHandler(async (req, res)=>{

    const {name,description,videoId} = req.body;
    if(!name || !description){
        throw new ApiError(402,"Playlist name and description is required")
    }

    const playlist = await Playlist.create({
        name,
        description,
        videos: videoId,
        owner: req.user._id
    })

    if(!playlist){
        throw new ApiError(402, "Failed to insert the playlist record");
    }

    return res.status(200).json(new ApiResponse(200, playlist, "Playlist is added successfully"));

})

const updatePlaylist = asyncHandler(async(req, res)=>{
    const {name, newName, description} = req.body;
    if(!name || !description){
        throw new ApiError(401, "Playlist name and description is required")
    }

    const getPlaylist = await Playlist.findOneAndUpdate(
        {name:name},
        {
            $set:{
                name: newName,
                description: description
            }
        },
        {
            new:true
        }
    )

    if(!getPlaylist){
        throw new ApiError(400,"Failed to update the playlist")
    }

    return res.status(200).json(new ApiResponse(200, getPlaylist, "Playlist updated successfully"))
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params;
    if(!playlistId || !videoId){
        throw new ApiError(400, "Playlist ID and video ID is required")
    }

    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $addToSet:{
                videos: videoId
            }
        },
        {
            new: true
        }
    )
    console.log(playlist);

    if(!playlist){
        throw new ApiError(400, "Failed to add video to playlist")
    }

    return res.status(200).json(new ApiResponse(200, playlist, "Video added to playlist successfully"))
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {

    const {playlistId, videoId} = req.params
    if(!playlistId || !videoId){
        throw new ApiError(400, "Playlist ID and video ID is required")
    }

    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $pull:{
                videos: videoId
            }
        },
        {
            new: true
        }
    )

    if(!playlist){
        throw new ApiError(400, "Failed to remove video from playlist")
    }

    return res.status(200).json(new ApiResponse(200, playlist, "Video removed from playlist successfully"))

})


export{
    createPlayList,
    updatePlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    getUserPlayList
}