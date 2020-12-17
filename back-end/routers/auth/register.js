const express = require('express')
const router = express.Router();

const Models = require('../../models/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../../validation')

router.post('/register', async (req, res) => {
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    const emailExist = await Models.Account.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send('Email already exists')

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const user = new Models.User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday,
        email: req.body.email,
        password: hashedPassword,
        phone: req.body.phone,
        typeOfUser: req.body.typeOfUser,
        
    })

    try{
        savedUser = await user.save()
        res.send(savedUser)
    }catch(e) {
        res.send(e)
    }
})

router.post('/register/type', async (req, res) => {
    let id = req.query.id
    let type = req.query.type

    if(type == "renter"){    
        const UserExist = await Models.User.findOne({_id: id})
        if(!UserExist) return res.status(400).send('User not existed')

        const renterExist = await Models.Renter.findOne({userId: id})
        if(renterExist) return res.status(400).send('Renter already exists')
        const renter = new Models.Renter({
            userId: id,
        })
        await renter.save()
        res.send(renter)
    } else if(type == "owner") {
        const UserExist = await Models.User.findOne({_id: id})
        if(!UserExist) return res.status(400).send('User not existed')

        const emailExist = await Models.Owner.findOne({userId: id})
        if(emailExist) return res.status(400).send('Email already exists')
        const owner = new Models.Owner({
            userId: id,
            identity: req.body.identity,
            address: req.body.address
        })
        await owner.save()
        res.send(owner)
    }
})

module.exports = router  
