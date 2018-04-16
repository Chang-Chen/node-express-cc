var express = require('express');
var router = express.Router();


//定义一个get请求   path为根目录
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
