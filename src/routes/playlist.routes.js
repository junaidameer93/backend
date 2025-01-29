import {Router} from 'express';
import {createPlayList, updatePlaylist, addVideoToPlaylist, removeVideoFromPlaylist} from "../controllers/playlist.controller.js";
import {verifyJWT} from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/create").post(createPlayList);
router.route("/update").patch(updatePlaylist);
router.route("/add/:playlistId/:videoId").patch(addVideoToPlaylist);
router.route("/remove/:playlistId/:videoId").patch(removeVideoFromPlaylist);

export default router;