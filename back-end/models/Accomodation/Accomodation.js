const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Favorite = require('./Favorite')

const AccomodationSchema = new Schema({
    accountId: {type: mongoose.Types.ObjectId, ref:"User"}, 
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
        typeOfBathroom: String,
        isHaveWaterHeater: Boolean,
        isHaveAirConditioner: Boolean,
        isHaveBalcony: Boolean,
        isHaveWifi: Boolean,
        isHaveKitchen: Boolean,
        electricBill: Number,
        waterBill: Number
    },
    type: String,
    status: String,
    images: [String],
    description: String,
    title: String,
    view: Number,
    postingTime: Date,
    expiredTime: Date,
    
})

AccomodationSchema.pre('deleteOne', { document: false, query: true }, async function(next) {
    
    const doc = await this.model.findOne(this.getFilter());
    await Favorite.deleteOne({accomId: doc._id})
    next()
  });

const Accomodation = mongoose.model("Accomodation", AccomodationSchema)
module.exports = Accomodation