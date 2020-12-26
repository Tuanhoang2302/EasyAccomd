const mongoose = require('mongoose');
const Schema = mongoose.Schema

const NotificationDiscountSchema = new Schema({
    accomId:{type:mongoose.Types.ObjectId, ref:"Accomodation"},
    content: String,
    createdAt: Date, 
    receiverId: {type:mongoose.Types.ObjectId, ref:"Account"}
})

const NotificationDiscount = mongoose.model("NotificationDiscount", NotificationDiscountSchema)
module.exports = NotificationDiscount