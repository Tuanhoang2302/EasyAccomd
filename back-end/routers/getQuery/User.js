const express = require('express')
const router = express.Router();
const verify = require('../auth/verifyToken')
const Models = require('../../models/index');
var fs = require('fs');
const path = require("path");
var mongoose = require('mongoose');

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(path.resolve(__dirname, file));
    // convert binary data to base64 encoded string
    return new Buffer.from(bitmap).toString('base64');
}

router.get('/getAccount/:id', async(req, res) => {
    var id = req.params.id
    Models.Account.findOne({
        _id: id
    }).then((data) =>{
        res.send(data)
    })
})


router.post('/login', (req, res) => {
    var email = req.body.email
    Models.Account.findOne({
        email: email
    }).then((data) => {
        if(data == null){
            res.send({valid: false})
        } else{
            res.send({valid: true, data:data})
        }
    })
})

router.post("/add/Account", async (req, res) => {
    const userId = mongoose.Types.ObjectId();
    var base64str = base64_encode('../../assets/images/male empty account.jpg');

    const account = new Models.Account({
        email: req.body.email,
        password: req.body.password,
        type: req.body.type,
        userId: userId,
        avatar: base64str
    })
    await account.save()
    const user = new Models.User({
        _id: userId,
        fullname: req.body.fullname,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber
    })
    await user.save()
    res.send({account: account, user: user})
})

router.get("/modify/anAccount", async (req, res) => {
    const accountId = req.query.accountId
    var base64str = base64_encode('../../assets/images/male empty account.jpg');
    
    Models.Account.where({
        _id: accountId
    }).update({
        avatar: base64str
        //userId: "5fda29be5c92424108f2e586"
    }).then((data) => {
        res.send(data)
    })
    
})


module.exports = router