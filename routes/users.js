var express = require('express');
var router = express.Router();
// var URL = require('url');
var paramsJson = require('../public/javascripts/verifyParams');
var findInfo = require('../public/javascripts/findInfo');
var addVerify = require('../public/verify/addVerify');
//导入mySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/usersql');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('用户信息接口');
});


//使用DBConfig.js的配置信息创建一个MySQL连接池
var pool = mysql.createPool( dbConfig.mysql );
//响应一个JSON数据
var responseJSON = function (res, ret) {
    if(typeof ret === 'undefined'){
        res.json({ status:-200,  msg:'操作失败'  });
    }else {
        res.json(ret);
    }
};
//添加用户
router.post('/addUser', function (req, res, next) {
    //获取前台页面传过来的参数进行校验
    var info = paramsJson.verifyPost(req);
    //校验参数
    addVerify.addUser(info,function (verifyRes) {
        if(verifyRes.status === -200){
            responseJSON(res,verifyRes);
            return false;
        }else {
            //校验用户名是否存在
            findInfo.findUserName(info,function (result) {
                if(result.status === -200){
                    responseJSON(res,result);
                    return false;
                }else {
                    //从连接池获取连接
                    pool.getConnection(function (err, connection) {
                        //建立连接 增加一个用户信息
                        connection.query(userSQL.insert,[info.userName,info.age,info.sex,info.work,info.phone,info.province,info.city,info.county], function(err, result) {
                            if(result){
                                result = { status:200, msg:'添加成功' };
                            }
                            //以JSON形式，把操作结果返回给其前台界面
                            responseJSON(res,result);
                            //释放连接
                            connection.release();
                        });
                    });

                }
            });
        }
    });
});

//查询所有用户信息
router.get('/queryAll',function (req, res, next) {
    pool.getConnection(function (err, connection) {
        connection.query(userSQL.queryAll,function (err,result) {
            if(result){
                result ={ status:200, mag:'请求成功', userList:result}
            }
            connection.release();
            return responseJSON(res,result);
        });
    });
});
//查询单个用户信息
router.get('/getUserInfo',function (req, res, next) {
    var info = paramsJson.varifyGet(req);
    //校验参数
    if(info.id === 'undefined' || info.id === ''){
        responseJSON(res,{status: -200, msg: '用户id为空'});
        return false;
    }
    findInfo.findUserInfo(info,function (result) {
        responseJSON(res,result);
    });
});
//删除单个用户
router.get('/deleteUser',function (req, res ,next) {
    var info = paramsJson.varifyGet(req);
    pool.getConnection(function (err, connection) {
        connection.query(userSQL.deleteByUserId,[info.id],function (err, result) {
            if(result){
                result = { status:200, msg:'删除成功' }
            }
            responseJSON(res,result);
            connection.release();
        })
    })
});
//修改用户信息
router.post('/editUser',function (req, res, next) {
   var info = paramsJson.verifyPost(req);
    //校验参数
    addVerify.addUser(info,function (verifyRes) {
        if(verifyRes.status === -200){
            responseJSON(res,verifyRes);
            return false;
        }else {
            pool.getConnection(function (err,connection) {
                connection.query(userSQL.updateUSer,[info.userName,info.age,info.sex,info.work,info.phone,info.province,info.city,info.county,info.id],function (err,result) {
                    if(result){
                        result = { status:200, msg:'修改成功' }
                    }
                    responseJSON(res,result);
                    connection.release();
                })
            })
        }
    })
});

module.exports = router;
