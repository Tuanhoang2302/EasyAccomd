const mongoose = require('mongoose');
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
    senderId:{type:mongoose.Types.ObjectId, ref:"Account"},
    senderEmail: String,
    type: String,
    createdAt: Date, 
    receiverId: {type:mongoose.Types.ObjectId, ref:"Account"},
    accomId: {type:mongoose.Types.ObjectId, ref:"Accomodation"},
    isChecked: Boolean
})

const Notification = mongoose.model("Notification", NotificationSchema)
module.exports = Notification