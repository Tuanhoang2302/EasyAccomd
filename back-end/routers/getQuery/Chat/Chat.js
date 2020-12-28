const express = require('express');
const router = express.Router();
const Models = require('../../../models/index')
var mongoose = require('mongoose');

router.get('/newRoom', async (req, res) => {
    const accountId = req.query.accountId
    const contactId = req.query.contactId
    const accomId = req.query.accomId

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

})

router.get('/get/contactId', async (req, res) => {
    const accomId = req.query.accomId
    Models.Accomodation.findOne({
        _id: accomId
    }).then((accom) => {
        res.send(accom.accountId)
    })
})

router.get('/getRoomChat', async (req, res) => {
    var accountId = req.query.accountId 
    //var accomId = req.query.accomId 
    Models.RoomChat.find({
        accountId: accountId
    }).populate([ "us" ])
    .exec(async (err, data) => {
        
        var contactIdList = []
        
        for(let i = 0; i < data.length; i++){
            var roomid = data[i]._id
            var accomId = data[i].accomId
            var lastMessage = data[i].lastMessage
            
            contactIdList.push({roomid:roomid, contactId: data[i].contactId, 
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
})

router.get('/getPrevMessage', async(req, res) => {
    var roomId = req.query.roomId
    await Models.Message.find({
        roomChatId: roomId
    }).then((data) => {
        res.send(data)
    })
})
module.exports = router