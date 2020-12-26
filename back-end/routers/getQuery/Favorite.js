const express = require('express');
const router = express.Router();
const Models = require('../../models/index')
var mongoose = require('mongoose');

router.get("/check", async (req, res) => {
    const accomId = req.query.accomId
    const accountId = req.query.accountId
    var checkExistingFavorite = await Models.Favorite.findOne({
        accomId: accomId,
        accountId: accountId
    })
    if(checkExistingFavorite == null)
        res.send(false)
    else
        res.send(true)
})

router.get("/create", async (req, res) => {
    const accomId = req.query.accomId
    const accountId = req.query.accountId

    const favorite = new Models.Favorite({
        accomId: accomId,
        accountId: accountId
    })
    favorite.save().then((data) => {
        res.send(data)
    })
})

router.get("/delete", async (req, res) => {
    const accomId = req.query.accomId
    const accountId = req.query.accountId
    await Models.Favorite.deleteOne({
        accomId: accomId,
        accountId: accountId
    })
    res.send("success")
})

router.get("/get/:accomId", async (req, res) => {
    const accomId = req.params.accomId
    var numberOfFavorite = await Models.Favorite.countDocuments({
        accomId: accomId
    })
    res.send(numberOfFavorite.toString())
})
module.exports = router