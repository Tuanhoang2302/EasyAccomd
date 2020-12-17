const mongoose = require('mongoose');
const Schema = mongoose.Schema

const FavoriteSchema = new Schema({
    rate: Number,
    accountId: {type: Schema.Types.ObjectId, ref: 'Account'},
    accomId: {type: Schema.Types.ObjectId, ref: 'Accomodation'},
})

const Favorite = mongoose.model("Favorite", FavoriteSchema)
module.exports = Favorite