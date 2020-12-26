const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    fullname: String,
    address: String,
    phoneNumber: String
})

const User = mongoose.model('User', UserSchema)
module.exports = User;