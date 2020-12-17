const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    fullname: String,
    address: String,
    phoneNumber: String
})

const User = mongoose.model('User', UserSchema)
module.exports = User;