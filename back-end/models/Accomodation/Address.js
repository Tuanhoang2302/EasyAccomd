const mongoose = require('mongoose');
const Schema = mongoose.Schema

const AddressSchema = new Schema({
    accomId: {type: Schema.Types.ObjectId, ref: 'Accomodation'},
    numberAddress: String,
    street: String,
    village: String,
    district: String,
    city: String,
})

const Address = mongoose.model("Address", AddressSchema)
module.exports = Address