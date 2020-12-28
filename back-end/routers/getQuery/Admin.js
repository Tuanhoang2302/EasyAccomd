const express = require('express')
const router = express.Router();
const verify = require('../auth/verifyToken')
const Models = require('../../models/index');
var fs = require('fs');
const path = require("path");
var mongoose = require('mongoose');

router.get("/get/checkedAccom/:index", async (req, res) => {
    const index= req.params.index
    const typeOfSearch = req.query.typeOfSearch
    var totalResult = await Models.Accomodation.countDocuments({
        isAccepted: typeOfSearch
    })
    await Models.Accomodation.find({
        isAccepted: typeOfSearch
    })
    .limit(15)
    .skip(15*(index - 1))
    .sort({expiredTime: -1})
    .then(async (accom) => {
        var result = []
        for(let i = 0; i < accom.length; i++){
            result.push(accom[i])
        }
        res.send({accom: result, totalResult: totalResult})
        
    })
})

router.get("/get/topAccom/:index", async (req, res) => {
    const index= req.params.index
    const typeOfSearch = req.query.typeOfSearch
    var sortQuery
    if(typeOfSearch == "view"){
        sortQuery = {view: -1}
    }else{
        sortQuery = {favorite: -1}
    }
    var totalResult = await Models.Accomodation.countDocuments({
        isAccepted: 1
    })
    await Models.Accomodation.find({
        isAccepted: 1
    })
    .limit(15)
    .skip(15*(index - 1))
    .sort(sortQuery)
    .then(async (accom) => {
        var result = []
        for(let i = 0; i < accom.length; i++){
            result.push(accom[i])
        }
        res.send({accom: result, totalResult: totalResult})
        
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