const models = require('../models')
const chatController = {}
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { Op } = require("sequelize");


chatController.create = async (req, res) =>{

    try {
        const encryptedId = req.params.userId
         const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)

         const chat = await models.chat.findOne({
            where:{
                userId: decryptedId.userId,
                userId2: req.params.userId2
            }

         })

         const chat2 = await models.chat.findOne({
            where:{
                userId: req.params.userId2,
                userId2: decryptedId.userId
            }

         })
         if(chat){
             res.json({chat})
         }
         else if (chat2){
            res.json({chat2}) 
         }else {
            const newchat = await models.chat.create({
                userId: req.params.userId2,
                userId2: decryptedId.userId
            })
            res.json({newchat})
         }

        //  const newchat = await models.chat.findOrCreate({
        //         where:{
        //             [Op.or]:[
        //            {
        //                userId: {
        //                    [Op.eq]: decryptedId.userId
        //                },
        //                userId2:{
        //                 [Op.eq]: req.params.userId2
        //                }
        //            },
        //            {
        //                userId: {
        //                    [Op.eq]: req.params.userId2
        //             },
        //             userId2:{
        //                    [Op.eq]: decryptedId.userId
        //                }
        //            }
        //        ]
        //      }
        //  })
        // res.json({newchat})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}



chatController.getchats = async (req, res) =>{

    try {
        const encryptedId = req.params.userId
         const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)

         const allchat = await models.chat.findAll({
            where:{
                [Op.or]:[
               {
                   userId: {
                       [Op.eq]: decryptedId.userId
                   },
                },
                {
                    userId2: {
                        [Op.eq]: decryptedId.userId
                    },
                }
            ]
            
        },
         include: ['chatmessage', models.user]
       
        
    })
         console.log(allchat)
        res.json({allchat})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}



chatController.getsinglechat = async (req, res) =>{

    try {
        // const encryptedId = req.params.userId
        //  const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)

         const singlechat = await models.chat.findOne({
             where:{
                userId: req.params.userId2
             }
             ,
              include: 'chatmessage'
         })
        res.json({singlechat})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


chatController.createmessage = async (req, res) =>{

    try {
        const encryptedId = req.params.userId
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)


        const newmessage = await models.message.create({
           chatId : req.params.chatId,
           userId : decryptedId.userId,
           message: req.body.message 

        })
        res.json({newmessage})
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

chatController.getallmessage = async (req,res) =>{

    try {

        const allmessage = await models.message.findAll({
            where: {

                chatId: req.params.chatId
            }
        })
        res.json({allmessage})
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = chatController
