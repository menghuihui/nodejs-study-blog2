
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Category = require('../models/Category');
router.use(function (req,res,next) {
    if(!req.userInfo.isAdmin){
        res.send('对不起，只有管理员才可以进入后台管理 ');
        return;
    }
    next();
})
/**
 * 首页
 * */
router.get('/',function (req,res,next) {
    res.render('admin/index',{
        userInfo : req.userInfo
    });
})
/**
 * 用户管理
 * */
router.get('/user',function (req,res,next) {
    /**
     * 查询用户列表
     *
     * limit(Number):限制获取的数据条数  一页几条数据
     *
     * skip(Number):忽略数据的条数
     *
     * 每页显示2条
     * 1：1-2 skip:0
     * 2：3-4 skip:2 => (当前页-1)*limit
     * 3：5-6 skip:4
     *
     * */

    var page = Number(req.query.page || 1);
    var limit = 2;
    var skip = (page - 1)*limit;
    var pages = 0;
    User.count().then(function (count) {
        //计算总页数
        pages = Math.ceil(count / limit);
        //取值不能超过pages
        page = Math.min(page,pages);
        //取值不能小于1
        page = Math.max(page,1);
        User.find().limit(limit).skip(skip).then(function (users) {
            res.render('admin/user_index',{
                userInfo : req.userInfo,
                users: users,

                page:page,//当前页数
                pages: pages//总页数

            });
        })
    })
})
/**
 * 分类管理
 * */
router.get('/category',function (req,res,next) {
    var page = Number(req.query.page || 1);
    var limit = 2;
    var skip = (page - 1)*limit;
    var pages = 0;
    Category.count().then(function (count) {
        //计算总页数
        pages = Math.ceil(count / limit);
        //取值不能超过pages
        page = Math.min(page,pages);
        //取值不能小于1
        page = Math.max(page,1);
        Category.find().limit(limit).skip(skip).then(function (categorys) {
            res.render('admin/category',{
                userInfo : req.userInfo,
                categorys: categorys,

                page:page,//当前页数
                pages: pages//总页数

            });
        })
    })
})
/**
 * 添加分类
 * */
router.get('/category/add',function (req,res,next) {
    res.render('admin/category_add',{
        userInfo : req.userInfo
    });
})
/**
 * 分类保存
 * */
router.post('/category/add',function (req,res,next) {
    var name =  req.body.name;
    var nameurl = req.body.url;
    if( !name || !nameurl){
        res.render('admin/error',{
            error:1,
            message:'输入不能为空'
        })
    }else{
        //保存分类列表的信息到数据库中
        var category = new Category({
            name :name,
            url : nameurl
        });
        return category.save().then(function () {
            res.render('admin/error',{
                error:0,
                message:'保存成功'
            })
        });
    }
})
module.exports = router;
