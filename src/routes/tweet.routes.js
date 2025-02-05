import { Router } from "express";
import { createTweet, updateTweet, deleteTweet, getUserTweets } from "../controllers/tweet.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"



const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/create").post(createTweet);
router.route("/update-tweet").patch(updateTweet);
router.route("/delete-tweet/:id").delete(deleteTweet);
router.route("/user-tweets/:id").get(getUserTweets);

export default router;