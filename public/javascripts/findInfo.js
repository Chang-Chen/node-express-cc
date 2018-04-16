/**
 * Created by apple-w on 2017/8/2.
 */
var express = require('express');
var mysql = require('mysql');
var dbConfig = require('../../db/DBConfig');
var userSQL = require('../../db/usersql');

var paramsJson = require('./verifyParams');

//使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );

//响应一个JSON数据
var responseJSON = function (res, ret) {
    if(typeof ret === 'undefined'){
        res.json({ status:'-200',  msg:'操作失败'  });
    }else {
        res.json(ret);
    }
};
var findInfo = {
    //查询用户是否存在
    findUserInfo:function (info,callback) {
        pool.getConnection(function (err, connection) {
            connection.query(userSQL.findUser,[info.id],function (err,result) {
                if(result.length > 0) {
                    result = { status: 200, msg: '查询成功', user: result[0] }
                }else {
                    result = { status: -200, msg: '没有当前用户信息' }
                }
                if (typeof callback === 'function'){
                    callback(result)
                }
                connection.release();
            })
        });
    },
    //查询用户名是否存在
    findUserName:function (info,callback) {
        pool.getConnection(function (err, connection) {
            connection.query(userSQL.findUserName,[info.userName],function (err,result) {
                if(result.length > 0) {
                    result = { status: -200, msg: '当前用户已存在' }
                }else {
                    result = { status: 200, msg: '没有当前用户信息' }
                }
                if (typeof callback === 'function'){
                    callback(result)
                }
                connection.release();
            })
        });
    },
};
module.exports = findInfo;