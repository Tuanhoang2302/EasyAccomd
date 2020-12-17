const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    accomId: {type: mongoose.Types.ObjectId, ref:"Accomodation"},
    accountId: {type: mongoose.Types.ObjectId, ref:"Account"},
    comment: String,
    createdAt: Date
})



const Comment = mongoose.model("Comment", CommentSchema)
module.exports = Comment