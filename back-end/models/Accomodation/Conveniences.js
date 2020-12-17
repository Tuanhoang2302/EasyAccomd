const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ConveniencesSchema = new Schema({
    accomId: {type: Schema.Types.ObjectId, ref: 'Accomodation'},
    typeOfBathroom: String,
    isHaveWaterHeater: Boolean,
    isHaveAirConditioner: Boolean,
    isHaveBalcony: Boolean,
    electricAndWaterBill: String,
    otherConveniences: String,
})

const Conveniences = mongoose.model("Conveniences", ConveniencesSchema)
module.exports = Conveniences