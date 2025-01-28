import {Router} from 'express';
import { publishVideo, getVideoById, updateVideo, deleteVideo,togglePublishStatus, getAllVideos } from '../controllers/video.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js'; 
import { upload } from '../middlewares/multer.middleware.js';


const router = Router();
router.use(verifyJWT);

router.route('/publish-video').post(upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
]), publishVideo);

router.route('/update/:videoId').post(upload.single("video"), updateVideo);
router.route('/:videoId').get(getVideoById);
router.route('/:videoId').delete(deleteVideo);
router.route('/toggle-publish-status/:videoId').put(togglePublishStatus);
router.route('/').get(getAllVideos);


export default router;
