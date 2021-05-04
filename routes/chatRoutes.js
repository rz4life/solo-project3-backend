const chatRoutes = require('express').Router()
const chatController = require('../controllers/chatController')


chatRoutes.post ('/create/:userId/:userId2', chatController.create)
chatRoutes.get ('/getchats/:userId', chatController.getchats)
chatRoutes.get ('/getsinglechat/:userId2', chatController.getsinglechat)
chatRoutes.post ('/createmessage/:chatId/:userId', chatController.createmessage)
chatRoutes.get ('/getallmessage/:chatId', chatController.getallmessage)






module.exports = chatRoutes
