import express from 'express'
import authControllers from '../Controllers/authControllers.js'
import restrict from '../Middlewares/restrictApi.js'
import multer from 'multer'

const router = express.Router();

const upload = multer({
    dest: 'uploads/', 
}); 

router.route('/login').post(authControllers.loginUser)
router.route('/logout').post(authControllers.logoutUser)

//User Control
router.route('/find_user').get(restrict, authControllers.findUser)
router.route('/find_users').get(restrict, authControllers.findUsers)
router.route('/new_user').post(restrict, authControllers.newUser)
router.route('/update_user').put(restrict, authControllers.updateUser)
router.route('/delete_user').delete(restrict, authControllers.deleteUser)
router.route('/send_feedback').post(restrict, authControllers.sendFeedback)

//Item Control
router.route('/new_item').post(restrict, upload.single('itemPicture'), authControllers.newItem)
router.route('/find_item').get(restrict, authControllers.findItem)
router.route('/find_items').get(restrict, authControllers.findItems)
router.route('/update_item').put(restrict, upload.single('itemPicture'), authControllers.updateItem)
router.route('/delete_item').delete(restrict, authControllers.deleteItem)

export default router;