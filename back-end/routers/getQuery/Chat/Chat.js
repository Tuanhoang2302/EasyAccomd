const express = require('express');
const router = express.Router();
const Models = require('../../../models/index')
var mongoose = require('mongoose');

router.get('/newRoom', async (req, res) => {
    var room = new Models.RoomChat({
        accountId:[
            mongoose.Types.ObjectId("5fd724b43121842dfc9e6474"),
            mongoose.Types.ObjectId("5fd773725bcfb3240c9dfc42"),
        ]
    })

    await room.save()
    res.send("success")

})

router.get('/getRoomChat', async (req, res) => {
    var accountId = req.query.accountId 
    Models.RoomChat.find({
        accountId: { $in: [accountId]}
    }).populate([ "fsdntId" ])
    .exec(async (err, data) => {
        
        var contactIdList = []
        function checkContactId(id) {
            if(id != accountId){
                return id
            }
          }
        for(let i = 0; i < data.length; i++){
            var roomid = data[i]._id
            var temp = data[i].accountId.filter(checkContactId)[0]
            contactIdList.push({roomid:roomid, contactId: temp})
        }
        
        var contactList = []
        for(let i = 0; i < contactIdList.length; i++){
            
            var account = await Models.Account.findOne({
                _id: contactIdList[i].contactId
            })
            //res.send(account)
            contactList.push({account: account, roomid: contactIdList[i].roomid})
        }
        res.send(contactList)
    })
})

router.get('/getPrevMessage', async(req, res) => {
    var roomId = req.query.roomId
    console.log(roomId);
    await Models.Message.find({
        roomChatId: roomId
    }).then((data) => {
        res.send(data)
    })
})
module.exports = router