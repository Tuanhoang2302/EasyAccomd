const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ChatSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    fromAccountId: {type: mongoose.Types.ObjectId, ref:"Account"},
    toAccountId: {type: mongoose.Types.ObjectId, ref:"Account"},
    content: String
})

const Chat = mongoose.model("Chat", ChatSchema)
module.exports = Chat