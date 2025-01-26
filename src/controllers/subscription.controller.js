import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js"
import { Subscription } from "../models/subscription.model.js";

const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params;
    const userId = req.user._id;

    if (!channelId) {
        throw new ApiError(400, "Channel id is required");
    }

    // if (channelId === String(userId)) {
    //     throw new ApiError(400, "You cannot subscribe to your own channel");
    // }

    console.log("params", channelId);
    console.log("body", userId);

    const isSubscribed = await Subscription.findOne({
        subscriber: userId,
        channel: channelId
    })

    if(isSubscribed){
        await Subscription.findByIdAndDelete(isSubscribed._id);
        return res.status(200).json(new ApiResponse(200, "Unsubscribed successfully"));
    }else{
        
        const status = await Subscription.create({
            subscriber: userId,
            channel: channelId
        })

        return res.status(200).json(new ApiResponse(200, "Subscribed successfully"));
    }

})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params;
    if (!channelId) {
        throw new ApiError(400, "Channel id is required");
    }
    const list = await Subscription.find({channel: channelId}).populate('subscriber');
    
    //console.log("Aggregation result:", JSON.stringify(list, null, 2));


    if (!list || list.length === 0) {
        throw new ApiError(404, "No subscribers found");
    }

    return res.status(200).json(new ApiResponse(200, list));
})

const getSubscribedChannels = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    if (!userId) {
        throw new ApiError(400, "User id is required");
    }

    const list = await Subscription.find({subscriber: userId}).populate('channel');
    
    //console.log("Aggregation result:", JSON.stringify(list, null, 2));

    return res.status(200).json(new ApiResponse(200, list));
})


export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };