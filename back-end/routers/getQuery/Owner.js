const express = require('express')
const router = express.Router();
const verify = require('../auth/verifyToken')
const Models = require('../../models/index');
var fs = require('fs');
const path = require("path");
var mongoose = require('mongoose');

router.get("/get/accom/:index", async (req, res) => {
    const accountId = req.query.accountId
    const index= req.params.index
    Models.Accomodation.find({
        accountId: accountId
    })
    // .select(["_id", "images", "price", "title", "isDisplay", 
    // "view", "postingTime", "expireTime", "displayTime"])
    .limit(15)
    .skip(15*(index - 1))
    .sort({postingTime: -1})
    .then(async (accom) => {
        var result = []
        for(let i = 0; i < accom.length; i++){
            var countFav = await Models.Favorite.countDocuments({
                accountId: accountId,
                accomId: accom[i]._id
            })
            result.push({accom: accom[i], countFav: countFav})
        }
        res.send(result)
        
    })
})

router.get("/delete/accom", async (req, res) => {
    const accomId = req.query.accomId

    await Models.Accomodation.deleteOne({
        _id: accomId
    })
    res.send("success")
})

module.exports = router