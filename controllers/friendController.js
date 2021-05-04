const models = require('../models')
const friendController = {}
const jwt = require('jsonwebtoken')
require('dotenv').config()


friendController.create = async (req, res) =>{

    try {
         const encryptedId = req.params.userId
         const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)
        
        const friend = await models.friendship.findOrCreate ({
            where:{
                userId : decryptedId.userId,
                userId2 : req.params.userId2,
                accepted : true 
            }
        })
        console.log(friend)  

        const friend2 = await models.friendship.findOrCreate ({
            where:{
                userId : req.params.userId2,
                userId2 : decryptedId.userId,
                accepted : false   
            }
        })
        console.log(friend2)  
        res.json({friend, friend2})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//when the current logged in user his trying to get all the friend request that was sent to him/her so they can either accept or denail
friendController.getmyfriendequests = async (req, res) =>{
    
    try {
        const encryptedId = req.params.userId
         const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)
     
     const userfriends = await models.friendship.findAll({
         where :{
             userId : decryptedId.userId,
             accepted: false
            }, 
            include: 'friend'
     })
     res.json({ userfriends})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}

// This is to get all the users that the current logged in user sent a friend request to but they have not accepeted it yet
friendController.getmysentfriendrequests = async (req, res) =>{

    try {
        const encryptedId = req.params.userId
         const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)
        let requests = await models.friendship.findAll({
            where: {
                userId2: decryptedId.userId, // userId of loggedInUser
                accepted: false
            },
            include: models.user
        })
        res.json({requests})
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


//This is to accept a friend that was sent to the current logged in user
friendController.acceptafriendrequest = async (req, res) =>{


    try {
        const encryptedId = req.params.userId
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)
        let friendrequest = await models.friendship.findOne({
            where:{
                userId: decryptedId.userId
            }
        })
        let accepted = await friendrequest.update({accepted:true})
        res.json({accepted})
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


//this is to get all my friend that we have both accepted thier freiend request
friendController.getuserfriends = async (req, res) =>{

    try {
        const encryptedId = req.params.userId
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)
        let acceptedFriends = await models.friendship.findAll({
            where: {
                userId: decryptedId.userId,
                accepted: true
            },
            include: 'friend'
        })
        res.json({ acceptedFriends})   
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

friendController.verifyfriend = async (req,res) =>{


    try {
        const encryptedId = req.params.userId
        const decryptedId = await jwt.verify(encryptedId, process.env.JWT_SECRET)

        const verify = await models.friendship.findOne({

            where:{
                userId: req.params.userId2,
                userId2: decryptedId.userId,
                accepted : true
            }
        })
        console.log(verify)
        if(verify){
            res.json( {accepted: true})
        }
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = friendController




// // logged in users friends where they've accepted the request
// app.post('/user/getfriends', async(req,res) => {
//     let user = await models.user.findOne({
//         where: {
//             id: req.body.userId1
//         }
//     })
//     // console.log(friends)
//     let acceptedFriends = await models.friendship.findAll({
//         where: {
//             userId: req.body.userId1,
//             accepted: true
//         },
//         include: models.user
//     })
//     res.json({ acceptedFriends})
// })
// // how to accept a friend request from another user 
// app.post('/user/acceptfriend', async(req,res) => {
//     // friendship between logged in user and potential friend
//     let friendship = await models.friendship.findOne({
//         where: {
//             userId: req.body.userId1, // userId of logged in user
//             userId2: req.body.userId2 // userId of potential friend
//         }
//     })
//     // friendship between potential friend and loggedin user
//     let friendship2 = await models.friendship.findOne({
//         where: {
//             userId: req.body.userId2, // userId of potential friend
//             userId2: req.body.userId1  // userId of logged in user
//         }
//     })
//     // update both relationships to accepted
//     let accepted = await friendship.update({accepted: true})
//     let accepted2 = await friendship2.update({accepted: true})
//     res.json({accepted, accepted2})
// })
// app.delete('/user/deletefriend', async(req,res) => {
//     // friendship between logged in user and potential friend
//     let friendship = await models.friendship.findOne({
//         where: {
//             userId: req.body.userId1, // userId of logged in user
//             userId2: req.body.userId2 // userId of potential friend
//         }
//     })
//     // friendship between potential friend and loggedin user
//     let friendship2 = await models.friendship.findOne({
//         where: {
//             userId: req.body.userId2, // userId of potential friend
//             userId2: req.body.userId1  // userId of logged in user
//         }
//     })
//     // delete both relationships if one person rejects or unfriends
//     let rejected = await friendship.destroy({accepted: false})
//     let rejected2 = await friendship2.destroy({accepted: false})
//     res.json({rejected, rejected2})
// })
