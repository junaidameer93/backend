import mongoose from 'mongoose';
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import {Comment} from '../models/comment.model.js';
import {asyncHandler} from '../utils/asyncHandler.js';


const getAllComments = asyncHandler(async (req, res) => {
    
    const comments = await Comment.find().populate('owner', 'username avatar');
    return res.status(200).json(new ApiResponse(200, comments));

})

const createComment = asyncHandler(async (req, res) => {
    const { content, videoId } = req.body;
    if (!content || !videoId) {
        throw new ApiError(400, 'Content and video IDs are required');
    }

    const comment = new Comment({
        content,
        video: videoId,
        owner: req.user._id,
    });

    const response = await comment.save();
    if (!response) {
        throw new ApiError(500, 'Failed to save comment');
    }

    return res.status(201).json(new ApiResponse(201, response));
})

const updateComment = asyncHandler(async (req, res) => {
    const { commentId, content } = req.body;
    if (!commentId || !content) {
        throw new ApiError(400, 'Comment ID and content are required');
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(404, 'Comment not found');
    }

    if (comment.owner.toString() !== req.user._id) {
        throw new ApiError(403, 'You are not allowed to update this comment');
    }

    comment.content = content;
    const response = await comment.save();
    if (!response) {
        throw new ApiError(500, 'Failed to update comment');
    }

    return res.status(200).json(new ApiResponse(200, response));
})

const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    if (!commentId) {
        throw new ApiError(400, 'Comment ID is required');
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(404, 'Comment not found');
    }

    if (comment.owner.toString() !== req.user._id) {
        throw new ApiError(403, 'You are not allowed to delete this comment');
    }

    const response = await Comment.findByIdAndDelete(commentId);
    if (!response) {
        throw new ApiError(500, 'Failed to delete comment');
    }

    return res.status(200).json(new ApiResponse(200, response));
})


export {
    createComment, 
    updateComment,
    deleteComment,
    getAllComments
};