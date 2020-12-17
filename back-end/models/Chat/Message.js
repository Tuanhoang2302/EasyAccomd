const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    roomChatId: {type: mongoose.Types.ObjectId, ref:"RoomChat"},
    senderId: {type: mongoose.Types.ObjectId, ref:"Account"},
    receiverId: {type: mongoose.Types.ObjectId, ref:"Account"},
    content: String,
    createdAt: Date,
    seenAt: Date,
})

const Message = mongoose.model("Message", MessageSchema)
module.exports = Message