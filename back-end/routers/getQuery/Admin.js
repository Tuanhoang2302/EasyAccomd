const express = require('express')
const router = express.Router();
const verify = require('../auth/verifyToken')
const Models = require('../../models/index');
var fs = require('fs');
const path = require("path");
var mongoose = require('mongoose');
const { route } = require('./Accomdation');

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

router.get("/get/allUser/:index", async (req, res) => {
    const index = req.params.index
    var totalNumberResult = await Models.Account.countDocuments({})
    await Models.Account.find({})
    .limit(15)
    .skip(15*(index - 1))
    .populate({
        path:'userId'
    })
    .then(async (userData) => {
        var resultList = []
        for(let i = 0; i < userData.length; i++){
            var totalNumberAccom
            await Models.Accomodation.find({
                accountId: userData[i]._id,
                isAccepted: 1
            }).then((accomData) => {
                totalNumberAccom = accomData.length
                var totalNumberFavorite = 0
                for(let j = 0; j < accomData.length; j++){
                    totalNumberFavorite += accomData[j].favorite
                }
                resultList.push({
                    user: userData[i], 
                    totalNumberAccom: totalNumberAccom,
                    totalNumberFavorite: totalNumberFavorite
                })
            })
        }
        res.send({result: resultList, totalNumberResult: totalNumberResult})
    })
})

router.get('/notChecked/accom/:index', async (req, res) => {
    const index = req.params.index
    var totalResult = await Models.Accomodation.countDocuments({
        isAccepted: 2
    })
    await Models.Accomodation.find({
        isAccepted: 2
    })
    .limit(15)
    .skip(15*(index - 1))
    .populate({
        path:"accountId",
        select: {"email": 1, "accountId._id": 1}
    })
    .then((accomData) => {
        res.send({accom: accomData, totalResult: totalResult})
    })
})

router.get("/notChecked/comment/:index", async (req, res) => {
    const index = req.params.index
    var totalResult = await Models.Comment.countDocuments({
        isChecked : {$eq: false}
    })
    var totalResult = await Models.Comment.find({
        isChecked : {$eq: false}
    })
    .limit(15)
    .skip(15*(index - 1))
    .populate(["accountId", "accomId"])
    .then((messData) => {
        res.send({comment: messData, totalResult: totalResult})
    })
})

router.get("/update/accomStatus", async (req, res) => {
    const accomId = req.query.accomId
    const adminReply = req.query.adminReply
    await Models.Accomodation.findOneAndUpdate({
        _id: accomId
    }, {isAccepted: adminReply})
    res.send("success")
})
router.get("/delete/accom", async (req, res) => {
    const accomId = req.query.accomId

    await Models.Accomodation.deleteOne({
        _id: accomId
    })
    res.send("success")
})

module.exports = router