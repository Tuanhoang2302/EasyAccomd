const express = require('express')
const router = express.Router();

const Models = require('../../models/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../../validation');

require('dotenv').config()
var tokenList = []
router.post('/login', async (req, res) => {
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    const account = await Models.Account.findOne({email: req.body.email})
    if(!account) return res.status(400).send('Email is wrong')
    const validPass = await bcrypt.compare(req.body.password, account.password)
    if(!validPass) return res.status(400).send('Invalid Password')

    let accessToken = jwt.sign({_id: account._id},
        process.env.ACCESS_TOKEN_SECRET, {
        algorithm: "HS256",
       expiresIn: "10m"
    })

    let refreshToken = jwt.sign({_id: account._id},
        process.env.REFRESH_TOKEN_SECRET, {
        algorithm: "HS256",
        expiresIn: "7d"
    })

    tokenList.push(refreshToken);
    //res.send(tokenList)
    res.header('auth-token', accessToken)
    await account.save();
    res.send({account,accessToken, refreshToken})
})

router.post('/refresh', async (req, res) => {
    const refreshToken = req.body.refreshToken
    //res.send(tokenList)
    //res.send(refreshToken)
    if((refreshToken) && (tokenList.includes(refreshToken))){
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        let newToken = jwt.sign({_id:req.body.userId}, process.env.ACCESS_TOKEN_SECRET, 
            {
                algorithm: "HS256",
                expiresIn: "1m"
            })
        res.send(newToken)
    }else{
        res.send("refreshToken is not valid")
    }
})

module.exports = router