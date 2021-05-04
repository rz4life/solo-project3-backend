const userRoutes = require('express').Router()
const userController = require('../controllers/userController')

userRoutes.post ('/signup', userController.create)
userRoutes.post ('/emaillogin', userController.emaillogin)
userRoutes.post ('/numberlogin', userController.numberlogin)
userRoutes.put ('/editprofile/:userId', userController.editprofile )
userRoutes.get ('/getuser/:userId', userController.getuser)
userRoutes.post ('/getalluser', userController.getalluser)
userRoutes.post ('/deleteuser/:userId', userController.deleteuser)




module.exports = userRoutes