const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Favorite = require('./Favorite')
const Comment = require('./Comment')
const RoomChat = require('../Chat/RoomChat')
const AccomodationSchema = new Schema({
    accountId: {type: mongoose.Types.ObjectId, ref:"Account"}, 
    address: {
        numberAddress: String,
        street: String,
        village: String,
        district: String,
        city: String,
    },
    price: Number,
    square: Number,
    conveniences: {
        numberOfRooms: Number,
        typeOfBathroom: String,
        isHaveFridge: Boolean,
        isHaveWaterHeater: Boolean,
        isHaveAirConditioner: Boolean,
        isHaveBalcony: Boolean,
        isHaveWifi: Boolean,
        isHaveKitchen: Boolean,
        waterBill: Number,
        electricBill: Number
    },
    isDisplay: Boolean,
    isAccepted: Number,
    type: String,
    status: String,
    images: [String],
    description: String,
    title: String,
    view: Number,
    displayTime: {
        year: Number,
        month: Number,
        week: Number
    },
    createdAt: Date,
    postingTime: Date,
    expiredTime: Date,
    
})

AccomodationSchema.pre('deleteOne', { document: false, query: true }, async function(next) {
    
    const doc = await this.model.findOne(this.getFilter());
    await Favorite.deleteMany({accomId: doc._id}) 
    await Comment.deleteMany({accomId: doc._id})
    await RoomChat.deleteMany({accomId: doc._id})
    next()
  });

const Accomodation = mongoose.model("Accomodation", AccomodationSchema)
module.exports = Accomodation