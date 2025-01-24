import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js"
import { Tweet } from "../models/tweet.model.js";

const createTweet = asyncHandler(async (req, res)=>{
    const {content, owner} = req.body;
    if(!content){
        throw new ApiError(400, "Content is required")
    }

    const tweet = new Tweet({
        content,
        owner
    })

    await tweet.save();

    return res.status(201).json(new ApiResponse(201, "Tweet created successfully", tweet))
})

const updateTweet = asyncHandler(async (req, res)=>{

    const {content,id} = req.body;
    if(!content){
        throw new ApiError(400, "Content is required")
    }

    const tweet = await Tweet.findByIdAndUpdate(
        id,
        {
            content
        },
        {
            new:true
        }
    );

    if(!tweet){
        throw new ApiError(404, "Tweet not found")
    }

    return res.status(200).json(new ApiResponse(200, "Tweet updated successfully", tweet))
})

const deleteTweet = asyncHandler(async (req, res)=>{
        const { id } = req.params;
        if(!id){
            throw new ApiError(400, "Tweet id is required")
        }

        const tweet = await Tweet.findByIdAndDelete(id);
        if(!tweet){
            throw new ApiError(404, "Tweet not found")
        }

        return res.status(200).json(new ApiResponse(200, "Tweet deleted successfully", tweet))  
})

const getUserTweets = asyncHandler(async (req, res)=>{
    const  { id } = req.params;
    if(!id){
        throw new ApiError(400, "User id is required")
    }

    const tweets = await Tweet.find({owner: id});
    if(!tweets){
        throw new ApiError(404, "Tweets not found for this user id")
    }
    //console.log(tweets)
    //const tweetsJson = tweets.map(tweet => tweet.toJSON());
    return res.status(200).json(new ApiResponse(200, "Tweets fetched successfully", tweets))
})

export { createTweet, updateTweet, deleteTweet, getUserTweets }