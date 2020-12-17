const mongoose = require('mongoose');
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    isAccepted: Boolean,
    content: String,
    accomId: {type:mongoose.Types.ObjectId, ref:"Accomdation"}
})

const Notification = mongoose.model("Notification", NotificationSchema)
module.exports = Notification