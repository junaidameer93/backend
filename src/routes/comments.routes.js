import {Router} from 'express';
import {verifyJWT} from '../middlewares/auth.middleware.js';
import {createComment, updateComment, getAllComments, deleteComment} from '../controllers/comment.controller.js';

const router = Router();
router.use(verifyJWT);


router.route('/').get(getAllComments);
router.route('/create-comment').post(createComment);
router.route('/update-comment').put(updateComment);
router.route('/delete-comment/:commentId').delete(deleteComment);



export default router;