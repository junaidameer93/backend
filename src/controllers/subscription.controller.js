import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js"
import { Subscription } from "../models/subscription.model.js";

const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params;
    const {userId} = req.body;

    if(!channelId){
        throw new ApiError(400, "Channel id is required")
    }

    if (channelId === String(userId)) {
        throw new ApiError(400, "You cannot subscribe to your own channel");
    }

    const isSubscribed = await Subscription.findOne({
        subscriber: userId,
        subscribedTO: channelId
    })

    if(isSubscribed){
        await Subscription.findByIdAndDelete(isSubscribed._id);
        return res.status(200).json(new ApiResponse(200, "Unsubscribed successfully"));
    }else{
        re
    }

})


export { toggleSubscription };