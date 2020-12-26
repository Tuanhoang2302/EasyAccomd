const mongoose = require('mongoose');
const Schema = mongoose.Schema

const AccountSchema = new Schema({
    //_id: mongoose.Types.ObjectId,
    email: {
        type: String,
        required: true,
        min:6,
        max:255,
    },
    password: {
        type: String,
        required: true,
        min:6,
        max:1024,
    },
    avatar: String,
    type: String,
    userId: {type: Schema.Types.ObjectId, ref:"User"},
    tokens: [String]
})

const Account = mongoose.model('Account', AccountSchema)
module.exports = Account;