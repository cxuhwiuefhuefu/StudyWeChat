var express = require('express');
var router = express.Router();
var UserModel = require('../db/models/UserModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });  /* 当以get方式请求我们根路径的时候 通过一个render方法下发一个index页面  */
});


// 模拟
router.get('/auth', function(req, res) {
  res.send('welcom to auth !!!');
})


// 用户将我们的数据提交给express里面某一个接口之后 express可以将这些数据存储到mongodb数据库里面去
// 我们前端是没有任何能力操作数据库的 必须经过我们服务端才可以 如果你想在express里面操作我们的数据库 那必然你需要连接Robo3T
router.post('/reg', function(req, res) {
  console.log(req.body); // 接受前端通过post提交的数据
  let {user, pwd} = req.body; // 使用结构赋值
  // 使用mongoose提供的方法，将user和pwd存储至我们的数据库
  // 一般mongoose操作数据的方法 一般我们会将它提取成一个独立模块 方便后面进行维护

  new UserModel({ // 一条具体的数据
    user: user,   // 存入数据表的字段名称（必须跟UserModel.js里面user:String进行对应）：字段值（必须跟上面结构出来的值对应）
    pwd: pwd
  }).seve().then(() => { // .seve()成功之后会返回一个promise对象 可以拿到状态 一般进入then代表存储成功了
    res.send({code: 1, msg: "注册成功"})
  }) 
})




module.exports = router;
