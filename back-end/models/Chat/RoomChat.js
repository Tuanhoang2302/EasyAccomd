const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RoomChatSchema = new Schema({
    accountId:[{type: mongoose.Types.ObjectId, ref:"Account"}],
})

const RoomChat = mongoose.model("RoomChat", RoomChatSchema)
module.exports = RoomChat