const express = require('express')
const router = express.Router();
const verify = require('../../auth/verifyToken')
const Models = require('../../../models/index')
var mongoose = require('mongoose');
const { route } = require('../../auth/login');
var fs = require('fs');
const path = require("path");

router.get('/newAccom', async (req, res) => {
    var accomId = mongoose.Types.ObjectId();
    var images = []
    function base64_encode(file) {
        // read binary data
        var bitmap = fs.readFileSync(path.resolve(__dirname, file));
        // convert binary data to base64 encoded string
        return new Buffer.from(bitmap).toString('base64');
    }

    for(let i = 0; i < 5; i++){
        var base64str = base64_encode(`../../../assets/images/hotel${i + 1}.jpg`);
        images.push(base64str)
    }

    const accom = new Models.Accomodation({
        //accountId: {type: mongoose.Types.ObjectId, ref:"User"}, 
        _id: accomId,
        address: {
            city:"Ninh Bình"
        },
        price: 17,
        square: 23,
        conveniences: {
            typeOfBathroom: "Bồn tắm",
            isHaveWaterHeater: true,
            isHaveAirConditioner: false,
            isHaveBalcony: true,
            isHaveWifi: false,
            isHaveKitchen: true,
            electricBill: 11,
            waterBill: 16
        },
        type: "Phòng riêng",
        status: "pending",
        images: images,
        description: "Thiết kế theo dạng căn hộ cao cấp, 1 căn bao gồm 4 phòng ngủ; 1 phòng khách, bếp và phòng ăn để khách có thể có tự nấu ăn và tụ tập ăn uống ngay tại nhà, Tầng 1 có bể bơi trong nhà giúp Khách thư giãn sau giờ đi chơi hoặc làm việc căng thẳng,Trên tầng thượng có 1 mini bar để khách thư giãn cafe ngắm toàn cảnh thành phố ninh Bình",
        title: "Balanha homestay - Nhà là nơi để về",
        view: 0,
        postingTime: null,
        expiredTime: null,
        
        
    })
    accom.save().then((data) => {
        res.send(data)
    })
    
})

router.get('/newFavorite', async (req, res) => {
    const accomId = mongoose.Types.ObjectId(req.query.accomId)
    const favorite = new Models.Favorite({
        rate: 4,
        accountId: null,
        accomId: accomId,
        content: "good"
    })

    favorite.save().then(data => res.send(data))
})

router.get('/removeAccom', async (req, res) => {
    await Models.Accomodation.deleteOne({"address.city": "Ninh Bình"})
    res.send("success")
})

router.get('/getFiveAccom', async (req, res) => {
    const city = req.query.city
    await Models.Accomodation.find({
        "address.city": city
    }).
    select(['address','type','images', 'title', 'price', '_id'])
    .exec(async (err, accom) => {
        var accomList = []
        for(let i = 0; i < accom.length; i++){
            await Models.Favorite.findOne({
                accomId: accom[i]._id
            }).then((favorite) => {
                var rate
                if(favorite == null){
                    rate = null
                } else {
                    rate = favorite.rate
                }
                savedAccom = {
                    _id: accom[i]._id,
                    address: accom[i].address,
                    type: accom[i].type,
                    title: accom[i].title,
                    images: accom[i].images,
                    price: accom[i].price,
                    rate: rate
                }
                accomList.push(savedAccom)
            })
        }
        res.send(accomList)
    })
})

router.get('/getAccomDetail/:id', async(req, res) => {
    var id = req.params.id
    Models.Accomodation.findOne({
        _id: id
    }).then((data) =>{
        res.send(data)
    })
})

module.exports = router
