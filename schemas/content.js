var mongoose = require('mongoose');
//分类表结构
module.exports = new mongoose.Schema({
    //关联字段
    category:{
        // 类型
        type:mongoose.Schema.Types.ObjectId,
        // 引用
        ref:'Category'
    },
    //内容标题
    title:String,
    //内容简介
    profile:String,
    //内容
    con:String,
})