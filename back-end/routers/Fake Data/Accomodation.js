const express = require('express')
const router = express.Router();
const verify = require('../auth/verifyToken')
const Models = require('../../models/index');
var fs = require('fs');
const path = require("path");
var mongoose = require('mongoose');
var faker = require('faker');
var axios = require('axios')
const ownerAccount = "5fe0ae94f4221b1ddc085e1f"
const typeOfBathroom = ["Bồn tắm", "Vòi hoa sen", "Phòng tắm chung"]
const typeOfAccom = ["Toàn bộ nhà", "Phòng riêng", "Phòng chung"]
const images = require('./Constant Data/image')
const description = "Thiết kế theo dạng căn hộ cao cấp, 1 căn bao gồm 4 phòng ngủ; 1 phòng khách, bếp và phòng ăn để khách có thể có tự nấu ăn và tụ tập ăn uống ngay tại nhà, Tầng 1 có bể bơi trong nhà giúp Khách thư giãn sau giờ đi chơi hoặc làm việc căng thẳng,Trên tầng thượng có 1 mini bar để khách thư giãn cafe ngắm toàn cảnh thành phố ninh Bình"
var days = 7;
var expireDate = new Date(Date.now()+days*24*60*60*1000);
const city = require("./Constant Data/city")

router.get('/accom/create', async (req, res) => {
    var jsonFile = []
    for(let i = 0; i < 1000; i++){
        const cityName = faker.random.arrayElement(city).province_name
        const cityId = faker.random.arrayElement(city).province_id
        
        var districts = await axios.get("https://vapi.vnappmob.com/api/province/district/" + cityId)
        const district = faker.random.arrayElement(districts.data.results)
        const districtName = district.district_name
        const districtId = district.district_id

        var wards = await axios.get("https://vapi.vnappmob.com/api/province/ward/" + districtId)
        var wardName
        if(wards.data.results.length > 0){
            const ward = faker.random.arrayElement(wards.data.results)
           wardName = ward.ward_name
        } else {
            wardName = null
        }
        var fiveImages = []
        for(let i = 0; i < 5; i++){
            fiveImages.push(faker.random.arrayElement(images))
        }
        //const accom = new Models.Accomodation(
        const accom = {
            accountId: mongoose.Types.ObjectId(ownerAccount), 
            address: {
                numberAddress: "117/4",
                street: "Cổ Nhuế",
                village: wardName,
                district: districtName,
                city: cityName,
            },
            price: faker.random.number(1000000, 20000000),
            square: faker.random.number(30, 100),
            conveniences: {
                numberOfRooms: faker.random.number(1, 4),
                typeOfBathroom: faker.random.arrayElement(typeOfBathroom),
                isHaveFridge: faker.random.boolean(),
                isHaveWaterHeater: faker.random.boolean(),
                isHaveAirConditioner: faker.random.boolean(),
                isHaveBalcony: faker.random.boolean(),
                isHaveWifi: faker.random.boolean(),
                isHaveKitchen: faker.random.boolean(),
                electricBill: faker.random.number(10000, 30000),
                waterBill: faker.random.number(10000, 30000)
            },
            type: faker.random.arrayElement(typeOfAccom),
            isDisplay: true,
            isAccepted: 1,
            images: fiveImages,
            description: description,
            title: "Nhà ở siêu cấp",
            view: faker.random.number(0, 30000),
            displayTime: {
                year: 1,
                month: 1,
                week: 1
            },
            createdAt: Date.now(),
            postingTime: Date.now(),
            expiredTime: expireDate,
        }
        //await accom.save()
        let data = JSON.stringify(accom, null, 2);
        jsonFile.push(data)
        console.log(i);
        //fs.writeFileSync('./accom.json', data);
    }
    console.log("start");
    fs.writeFileSync('./accom.json', jsonFile);
    console.log("end");
    res.send("success")
})

router.get("/accom/delete", async (req, res) => {
    Models.Accomodation.deleteMany({
        title: "Nhà ở siêu cấp"
    }).then(result => res.send(result))
})


module.exports = router