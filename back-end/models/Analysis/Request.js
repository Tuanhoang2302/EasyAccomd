const mongoose = require('mongoose');
const Schema = mongoose.Schema

const RequestSchema = new Schema({
    accomId: {type: Schema.Types.ObjectId, ref: 'Accomodation'},
    ownerId: {type: Schema.Types.ObjectId, ref: 'Owner'},
    status: String
})

const Request = mongoose.model("Request", RequestSchema)
module.exports = Request