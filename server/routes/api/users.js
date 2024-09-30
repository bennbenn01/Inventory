import express from 'express'
import userControllers from '../../Controllers/userControllers.js'

const router = express.Router();

router.route('/login').post(userControllers.loginUser)
router.route('/logout').post(userControllers.logoutUser)
router.route('/find_user').get(userControllers.findUser)
router.route('/find_users').get(userControllers.findUsers)
router.route('/new_user').post(userControllers.newUser)
router.route('/update_user').put(userControllers.updateUser)
router.route('/delete_user').delete(userControllers.deleteUser)

export default router;