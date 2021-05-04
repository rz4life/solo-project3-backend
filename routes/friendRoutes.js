const friendRoutes = require('express').Router()
const friendController = require('../controllers/friendController')


friendRoutes.post ('/create/:userId/:userId2', friendController.create)
friendRoutes.get ('/getmyfriendequests/:userId', friendController.getmyfriendequests)
friendRoutes.get ('/getmysentfriendrequests/:userId', friendController.getmysentfriendrequests)
friendRoutes.post ('/acceptafriendrequest/:userId', friendController.acceptafriendrequest)
friendRoutes.get ('/getuserfriends/:userId', friendController.getuserfriends)
friendRoutes.get ('/verifyfriend/:userId/:userId2', friendController.verifyfriend)





module.exports = friendRoutes
