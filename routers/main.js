
var express = require('express');
var router = express.Router();
var Category = require('../models/Category');

router.get('/',function (req,res,next) {
    Category.find().then(function (result) {
        res.render('main/index',{
            types: result,
            userInfo : req.userInfo
        });
    })
})

module.exports = router;
