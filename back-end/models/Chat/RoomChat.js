const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RoomChatSchema = new Schema({
    accountId:{type: mongoose.Types.ObjectId, ref:"Account"},
    contactId: {type: mongoose.Types.ObjectId, ref:"Account"},
    accomId: {type: mongoose.Types.ObjectId, ref:"Accomodation"},
    lastMessage: String
})

const RoomChat = mongoose.model("RoomChat", RoomChatSchema)
module.exports = RoomChat