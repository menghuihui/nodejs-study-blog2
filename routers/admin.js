
var express = require('express');
var router = express.Router();

router.get('/user',function (req,res,next) {
    // res.send('<h1>欢迎光临我的博客</h1>');
    res.send('Admin - User');
})

module.exports = router;
