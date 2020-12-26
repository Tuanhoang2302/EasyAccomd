const express = require('express');
const router = express.Router();
const Models = require('../../models/index')
var mongoose = require('mongoose');

router.post("/create", async (req, res) => {
    var accomId = req.body.accomId
    var accountId = req.body.accountId
    for(let i = 0; i < 1; i++) {
        const comment = new Models.Comment({
            accomId: mongoose.Types.ObjectId(accomId),
            accountId: mongoose.Types.ObjectId(accountId),
            comment: req.body.comment,
            isChecked: false,
            createdAt: Date.now()
        })
        await comment.save()
    }
    res.send("success")
})

router.get("/get/allComment", async (req, res) => {
    var accomId = req.query.accomId
    var numberComment = await Models.Comment.countDocuments({
        accomId: accomId
    })
    var commentList = await Models.Comment.find({
        accomId: accomId
    }).sort({createdAt: -1})
    .populate({
        path: 'accountId',
        //select: {"userId" : 1},
        populate:{
            path: "userId"
        }
    })
    var result = {
        numberComment: numberComment,
        commentList: commentList
    }
    res.send(result)
})
router.get("/delete/allComment", async (req, res) => {
    Models.Comment.deleteMany({}).then((data) => {
        res.send("success")
    }) 
})
module.exports = router