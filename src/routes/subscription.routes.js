import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { toggleSubscription, getUserChannelSubscribers,getSubscribedChannels } from "../controllers/subscription.controller.js";


const router = Router();
router.use(verifyJWT);

router.route("/toggle-subscription/:channelId").get(toggleSubscription);
router.route("/get-subscribers/:channelId").get(getUserChannelSubscribers);
router.route("/get-subscriptions").get(getSubscribedChannels);


export default router;