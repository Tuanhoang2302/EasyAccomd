const express = require('express');
const router = express.Router();
const Models = require('../../../models/index')
var mongoose = require('mongoose');
router.get('/reservation', async (req, res) => {
    var accomId = req.query.accomId
    var startDate = new Date(2020, 11, 15)
    var endDate = new Date(2020, 11, 17)
    const newReservation = new Models.Reservation({
        startDate: startDate,
        endDate: endDate,
        accom: accomId,
    })

    await newReservation.save().then((data) => {
        res.send(data)
    })
})

router.get('/reservation/find', async (req, res) => {
    var accomId = req.query.accomId
    Models.Reservation.find({
        accom: accomId
    }).then((data) => {
        res.send(data)
    })

})

module.exports = router