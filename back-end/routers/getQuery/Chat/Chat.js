const express = require('express');
const router = express.Router();
const Models = require('../../../models/index')
var mongoose = require('mongoose');

const checkObjectId = (objectId) => {
    return mongoose.Types.ObjectId(objectId)
}
router.get('/newRoom', async (req, res) => {
    try{
        const accountId = checkObjectId(req.query.accountId)
        const contactId = checkObjectId(req.query.contactId)
        const accomId = checkObjectId(req.query.accomId)
        var checkRoom = await Models.RoomChat.findOne({
            accountId: accountId,
            contactId: contactId,
            accomId: accomId
        })
        if(checkRoom != null){
            res.send("room has existed")
        } else {
            var room = new Models.RoomChat({
                accountId: accountId,
                contactId: contactId,
                accomId: accomId
            })
            await room.save()
            res.send("success")
        }
    }catch(err){
        console.log(err);
        res.status(400).send(err)
    }

})

router.get('/get/contactId', async (req, res) => {
    try{
        const accomId = checkObjectId(req.query.accomId)
        Models.Accomodation.findOne({
            _id: accomId
        }).then((accom) => {
            res.send(accom.accountId)
        })
    }catch(err){
        res.status(400).send(err)
    }
})

router.get('/getRoomChat', async (req, res) => {
    try{
        var accountId = req.query.accountId
        //var accomId = req.query.accomId 
        Models.RoomChat.find({
            $or:[{accountId: accountId}, {contactId: accountId}]
            //accountId: accountId
        }).populate([ "us" ])
        .exec(async (err, data) => {
            
            var contactIdList = []
            
            for(let i = 0; i < data.length; i++){
                var roomid = data[i]._id
                var accomId = data[i].accomId
                var lastMessage = data[i].lastMessage
                var contact
                if(data[i].contactId == accountId){
                    contact = data[i].accountId
                } else {
                    contact = data[i].contactId
                }
                contactIdList.push({roomid:roomid, contactId: contact, 
                    accomId: accomId, lastMessage: lastMessage})
            }
            
            var contactList = []
            for(let i = 0; i < contactIdList.length; i++){
                
                var account = await Models.Account.findOne({
                    _id: contactIdList[i].contactId
                }).populate({
                    path:"userId"
                })
                var accom = await Models.Accomodation.findOne({
                    _id:contactIdList[i].accomId
                })
                //res.send(account)
                contactList.push({account: account, 
                    roomid: contactIdList[i].roomid,
                    accom: accom, lastMessage: contactIdList[i].lastMessage})
            }
            res.send(contactList)
        })
    }catch(err){
        res.status(400).send(err)
    }
})

router.get('/getPrevMessage', async(req, res) => {
    try{
        var roomId = checkObjectId(req.query.roomId)
        await Models.Message.find({
            roomChatId: roomId
        }).then((data) => {
            res.send(data)
        })
    }catch(err) {
        res.status(400).send(err)
    }
})
module.exports = router