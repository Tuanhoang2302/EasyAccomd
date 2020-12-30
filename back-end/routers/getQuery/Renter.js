const express = require('express')
const router = express.Router();
const verify = require('../auth/verifyToken')
const Models = require('../../models/index');
var fs = require('fs');
const path = require("path");
var mongoose = require('mongoose');

router.get("/get/favoriteAccom", async (req, res) => {
    const accountId = req.query.accountId
    Models.Favorite.find({
        accountId: accountId
    })
    .limit(15)
    .populate({
        path: 'accomId',
        populate: {
            path: 'accountId',
            populate: {
                path: 'userId'
            }
        }
    })
    .then((accomData) => {
        var result = []
        for(let i = 0; i < accomData.length; i++){
            result.push({
                accom: accomData[i].accomId,
                owner: accomData[i].accomId.accountId.userId
            })
        }
        res.send(result)
        //res.send(accomData)
    })
})

module.exports = router