const express = require('express')
const router = express.Router();
const verify = require('../auth/verifyToken')
const Models = require('../../models/index');
var fs = require('fs');
const path = require("path");
var mongoose = require('mongoose');
var multer  = require('multer')
var faker = require("faker")
var validateInput = require('./ValidateInput')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.dirname("E:\\btl web\\my-app\\public\\assets\\images\\rưer"))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
var upload = multer({ storage: storage })
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

router.post('/create', verify, async (req, res) => {
    var postTime, expiredTime, postTimeString, expiredTimeString
    if(req.body.accomId){
        postTime = new Date()
        expiredTime = postTime.addDays(req.body.year * 365 + req.body.month + req.body.week * 7)
        postTimeString = postTime.toString()
        expiredTimeString = expiredTime.toString()

    } else {
        postTimeString = null
        expiredTimeString = null
    }
    
    try{
        validateInput.checkConvens(req.body.accountId)
        var accomForm = {
            accountId: req.body.accountId, 
            address: {
                numberAddress: req.body.numberAddress,
                street: req.body.street,
                village: req.body.village,
                district: req.body.district,
                city: req.body.city,
            },
            price: req.body.price,
            square: req.body.square,
            conveniences: {
                numberOfRooms: req.body.numberOfRooms,
                typeOfBathroom: req.body.typeOfBathroom,
                isHaveFridge: req.body.isHaveFridge,
                isHaveWaterHeater: req.body.isHaveWaterHeater,
                isHaveAirConditioner: req.body.isHaveAirConditioner,
                isHaveBalcony: req.body.isHaveBalcony,
                isHaveWifi: req.body.isHaveWifi,
                isHaveKitchen: req.body.isHaveKitchen,
                electricBill: req.body.electricBill,
                waterBill: req.body.waterBill
            },
            type: req.body.type,
            isDisplay: true,
            isAccepted: 2,
            images: req.body.images,
            description: req.body.description,
            title: req.body.title,
            view: 0,
            favorite: 0,
            displayTime: {
                year: req.body.year,
                month: req.body.month,
                week: req.body.week
            },
            createdAt: (Date.now()).toString(),
            postingTime: postTimeString,
            expiredTime: expiredTimeString,
        }

        validateInput.checkConvens({
            isHaveFridge: req.body.isHaveFridge,
            isHaveWaterHeater: req.body.isHaveWaterHeater,
            isHaveAirConditioner: req.body.isHaveAirConditioner,
            isHaveBalcony: req.body.isHaveBalcony,
            isHaveWifi: req.body.isHaveWifi,
            price: req.body.price,
            square: req.body.square,
        })
        

        validateInput.checkInputNumberValue({
            numberOfRooms: req.body.numberOfRooms,
            electricBill: req.body.electricBill,
            waterBill: req.body.waterBill,
            year: req.body.year,
            month: req.body.month,
            week: req.body.week
        })

        validateInput.checkInputStringValue({
            numberAddress: req.body.numberAddress,
            street: req.body.street,
            village: req.body.village,
            district: req.body.district,
            city: req.body.city,
        })
    
        if(req.body.accomId == null || req.body.accomId == ""){
            console.log("Hello");
            const accom = new Models.Accomodation(accomForm)
            await accom.save().then(data => res.send(data))
        } else {
            await Models.Accomodation.findOneAndUpdate({
                _id: req.body.accomId
            }, accomForm)
            res.send("update success")
        }
    }catch(err){
        res.status(400).send(err)
    }
})

router.get('/get/userManage',async (req, res) => {
    Models.Accomodation.find({
    }).sort({createdAt: -1})
    .limit(15)
    .then((data) => {
        res.send(data)
    })
})

router.post("/upload/image", upload.array('photos', 12), async (req, res) => {
var files = req.files 
//console.log(files);
  if (!files) {
    res.send(null)
  }else {
    var newPaths = files.map((file) => {
        return file.path.replace("E:\\btl web\\my-app\\public", "")
        
    })
    res.send(newPaths)
}
  
})

router.get("/update/incrementView", async (req, res) => {
    var accomId = req.query.accomId
    Models.Accomodation.findOneAndUpdate(
        {_id:accomId},
        {$inc: {'view' : 1}}
    ).exec((data) => {
        res.send(data)
    })
})

router.post("/find/filter/:index", verify, async (req, res) => {
    const convens = req.body.conveniences
    const address = req.body.address
    const price  = req.body.price
    const type = req.body.type
    const index = req.params.index

    validateInput.checkConvens(convens)
    validateInput.checkInputNumberValue({
        address: address,
        price: price,
        index: index
    })
    var resultQuery ={}

    if(convens != null){
        Object.keys(convens).map((key, index) => {
            if(convens[key] == false || convens[key] == null){
                delete convens[key]
            } else{
                resultQuery[`conveniences.${key}`] = {$eq: true}
            }
        })
    }
    if(address != null){
        Object.keys(address).map((key, index) => {
            if(address[key] == null){
                delete address[key]
            } else{
                resultQuery[`address.${key}`] = {$eq: address[key]}
            }
        })
    }
    
    if(price != null){
        resultQuery["price"] = {$gt: price[0] * 1000000, $lt: price[1] * 1000000}
    }

    if(type != null) {
        resultQuery["type"] = {$eq : type}
    }
    resultQuery["isAccepted"] = {$eq: 1}
    var totalResult = await Models.Accomodation.countDocuments(resultQuery)
    var listAccom = await Models.Accomodation.find(resultQuery)
    .select(['address.city','type','images', 'title', 'price', '_id'])
    .limit(15)
    .skip(15*(index - 1))
    res.send({listAccom: listAccom, totalResult: totalResult})
    
  
})

router.get("/delete", async (req, res) => {
    await Models.Accomodation.deleteMany({})
    res.send.apply("succes")
})
router.get("/update", async (req, res) => {
    //res.send(faker.date.between('2018-01-01', '2020-01-01'))
    var accom  = await Models.Accomodation.find({})
    .then(async (accomData) => {
        for(let i = 0; i< accomData.length; i++){
            await Models.Accomodation.findOneAndUpdate({
                _id: accomData[i]._id,
                isAccepted: 0
            }, {
                //accountId: mongoose.Types.ObjectId(accomData[i].accountId)
                //view: 0, favorite: 0
            }, {new: true})
        }
        res.send("success")
    })
})

router.get('/get/recently/:index', verify ,async (req, res) => {
    const index = req.params.index
    var totalResult = await Models.Accomodation.countDocuments({
        isAccepted: 1
    })
    Models.Accomodation.find({
        isAccepted: 1
    })
    .sort({createdAt: -1})
    .limit(15)
    .skip(15*(index - 1))
    .select(['address.city','type','images', 'title', 'price', '_id', 'favorite'])
    .then((data) => {
        res.send({listAccom: data, totalResult: totalResult})
    })
})

router.get('/get/userDetail', async (req, res) => {
    const userId = req.query.userId
    var user = await Models.Account.findOne({
        _id: userId
    }).populate("userId")
    var totalView = 0, totalPostedAccom, totalFavorite = 0
    await Models.Accomodation.find({
        accountId: userId,
        isAccepted: {$eq: 1}
    }).then((accomData) => {
        totalPostedAccom = accomData.length
        for(let i = 0; i < accomData.length; i++){
            totalView += accomData[i].view
            totalFavorite += accomData[i].favorite
        }
        res.send({
            totalPostedAccom: totalPostedAccom,
            totalView: totalView,
            totalFavorite: totalFavorite,
            user: user
        })

    })
    
})


module.exports = router