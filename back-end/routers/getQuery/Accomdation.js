const express = require('express')
const router = express.Router();
const verify = require('../auth/verifyToken')
const Models = require('../../models/index');
var fs = require('fs');
const path = require("path");
var mongoose = require('mongoose');
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.dirname("E:\\btl web\\my-app\\public\\assets\\images\\rưer"))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
var upload = multer({ storage: storage })

router.post('/create', async (req, res) => {
    const accom = new Models.Accomodation({
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
        isDisplay: false,
        isAccepted: 2,
        images: req.body.images,
        description: req.body.description,
        title: req.body.title,
        view: 0,
        displayTime: {
            year: req.body.year,
            month: req.body.month,
            week: req.body.week
        },
        createdAt: Date.now(),
        postingTime: null,
        expiredTime: null,
    })
    
    accom.save().then(data => res.send(data))
})

router.get('/get/userManage', async (req, res) => {
    Models.Accomodation.find({
        isAccepted: false
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

router.post("/find/filter/:index", async (req, res) => {
    const convens = req.body.conveniences
    const address = req.body.address
    const price  = req.body.price
    const type = req.body.type
    const index = req.params.index
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
        resultQuery["price"] = {$gt: price[0] * 100000, $lt: price[1] * 100000}
    }

    if(type != null) {
        resultQuery["type"] = {$eq : type}
    }
    var totalResult = await Models.Accomodation.countDocuments(resultQuery)
    var listAccom = await Models.Accomodation.find(resultQuery)
    .select(['address.city','type','images', 'title', 'price', '_id'])
    .limit(15)
    .skip(15*(index - 1))
    res.send({listAccom: listAccom, totalResult: totalResult})
  
})

router.get("/update", async (req, res) => {
    Models.Accomodation.updateMany({}, {
        accountId: mongoose.Types.ObjectId("5fe0ae94f4221b1ddc085e1f")
    }).then((data) => {
        res.send("success")
        console.log("success");
    })
})

router.get('/get/recently/:index', async (req, res) => {
    const index = req.params.index
    var totalResult = await Models.Accomodation.countDocuments({})
    Models.Accomodation.find({})
    .sort({createdAt: -1})
    .limit(15)
    .skip(15*(index - 1))
    .select(['address.city','type','images', 'title', 'price', '_id'])
    .then((data) => {
        res.send({listAccom: data, totalResult: totalResult})
    })
})


module.exports = router