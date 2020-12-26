const mongoose = require('mongoose');
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
    senderId:{type:mongoose.Types.ObjectId, ref:"Account"},
    type: String,
    createdAt: Date, 
    receiverId: {type:mongoose.Types.ObjectId, ref:"Account"}
})

const Notification = mongoose.model("Notification", NotificationSchema)
module.exports = Notification