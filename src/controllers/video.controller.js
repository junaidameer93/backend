import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {ApiError} from '../utils/ApiError.js';
import {Video} from '../models/video.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';


const publishVideo = asyncHandler(async (req, res, next) => {
    
    const { title, description } = req.body;
    if (!title || !description) {
        return next(new ApiError(400, 'Title and description are required'));
    }

    const videoLocalPath = req.files?.video?.[0].path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0].path;

    if (!videoLocalPath || !thumbnailLocalPath) {
        return next(new ApiError(400, 'Video and thumbnail are required'));
    }

    const videoCloudPath = await uploadOnCloudinary(videoLocalPath);
    const thumbnailCloudPath = await uploadOnCloudinary(thumbnailLocalPath);

    if (!videoCloudPath || !thumbnailCloudPath) {
        return next(new ApiError(500, 'Failed to upload video or thumbnail'));
    }

    const video = new Video({
        title,
        description,
        videofile: videoCloudPath.url,
        thumbnail: thumbnailCloudPath.url,
        duration: 0,
        views: 0,
        isPublished: true,
        owner: req.user._id,
    });

    const response = await video.save();
    if (!response) {
        return next(new ApiError(500, 'Failed to save video'));
    }

    return res.status(201).json(new ApiResponse(201, response));

})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if (!videoId) {
        return next(new ApiError(400, 'Video ID is required'));
    }

    const video = await Video.findById(videoId).populate('owner', 'username avatar');
    if (!video) {
        return next(new ApiError(404, 'Video not found'));
    }           

    return res.status(200).json(new ApiResponse(200, video));

})


export { publishVideo, getVideoById }