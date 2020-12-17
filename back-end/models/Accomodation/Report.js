const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ReportSchema = new Schema({
    content: String,
    accountId: {type: Schema.Types.ObjectId, ref: 'Account'},
    accomId: {type: Schema.Types.ObjectId, ref: 'Accomodation'},
    content: String
})

const Report = mongoose.model("Report", ReportSchema)
module.exports = Report