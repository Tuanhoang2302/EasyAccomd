const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ReservationSchema = new Schema({
    startDate: Date,
    endDate: Date,
    totalPrice: Number,
    createdAt: Date,
    user: {type: Schema.Types.ObjectId, ref:"User"},
    accom: String,
})

const Reservation = mongoose.model("Reservation", ReservationSchema)
module.exports = Reservation