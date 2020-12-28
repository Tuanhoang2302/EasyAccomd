const express = require('express')
const router = express.Router();
const verify = require('../auth/verifyToken')
const Models = require('../../models/index');
var fs = require('fs');
const path = require("path");
var mongoose = require('mongoose');
var faker = require('faker');
const bcrypt = require('bcryptjs')

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(path.resolve(__dirname, file));
    // convert binary data to base64 encoded string
    return new Buffer.from(bitmap).toString('base64');
}
router.get("/account/create", async (req, res) => {
    var base64str = base64_encode('../../assets/images/male empty account.jpg');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456", salt);
    var accountList = [], userList = []

    for(let i = 0; i < 1000; i++){
        const userId = mongoose.Types.ObjectId();
        const account = {
            email: `faker${i}@gmail.com`,
            password: hashedPassword,
            type: "ownerFake",
            userId: userId,
            avatar: base64str
        }
        const user = {
            _id: userId,
            fullname: faker.name.firstName() + " " + faker.name.lastName(),
            address: faker.address.city(),
            phoneNumber: faker.phone.phoneNumber()
        }
        accountList.push(account)
        userList.push(user)
        console.log(i);
    }
    let accountJson = JSON.stringify(accountList, null, 2);
    let userJson = JSON.stringify(userList, null, 2);
    //fs.writeFileSync('./user.json', userJson);
    //fs.writeFileSync('./account.json', accountJson);
    console.log("success");
    res.send("success")
})

router.get("/account/update", async (req, res) => {
    await Models.Account.find({
        type:"ownerFake"
    }).then(async (accountData) => {
        for(let i = 0; i < accountData.length; i++){
            await Models.Account.findOneAndUpdate({_id: accountData[i]._id}, {
                type:"owner"
            })
        }
        res.send("success")
    })
})
module.exports = router