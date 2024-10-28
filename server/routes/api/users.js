import express from 'express'
import userControllers from '../../Controllers/userControllers.js'
import restrict from '../../Middlewares/restrictApi.js';

const router = express.Router();

router.route('/login').post(userControllers.loginUser)
router.route('/logout').post(userControllers.logoutUser)
router.route('/find_user').get(restrict, userControllers.findUser)
router.route('/find_users').get(restrict, userControllers.findUsers)
router.route('/new_user').post(restrict, userControllers.newUser)
router.route('/update_user').put(restrict, userControllers.updateUser)
router.route('/delete_user').delete(restrict, userControllers.deleteUser)
router.route('/send_feedback').post(restrict, userControllers.sendFeedback)

export default router;