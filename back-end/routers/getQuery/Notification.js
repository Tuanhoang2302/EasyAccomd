const express = require('express');
const router = express.Router();
const Models = require('../../models/index')
var mongoose = require('mongoose');

router.get("/getAll", async (req, res) => {
    const receiverId = req.query.receiverId
    Models.Notification.find({
        receiverId: receiverId,
    }).
    sort({createdAt: -1}).
    then((data) => res.send(data))
})
module.exports = router

router.get("/update/seenNoti", async (req, res) => {
    const notiId = req.query.notiId
    await Models.Notification.findOneAndUpdate({
        _id: notiId
    }, {isChecked: true})
    res.send("success")
})