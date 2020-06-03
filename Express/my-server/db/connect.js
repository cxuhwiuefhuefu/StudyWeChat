const mongoose = require("mongoose");


// 数据库地址 端口 新建数据库的名称 /weixin：在我们操作数据库的时候就会独立在我们整个mongodb里面新建以微信命名的数据库 方便我们去查看 
mongoose.connect('mongodb://127.0.0.1:27017/weixin', (err) => {
    if(err) {
        console.log('数据库连接失败');
    }else {
        console.log('数据库连接成功');
    }
}) 


// 如果想让它跑起来 只需要在入口文件里面去执行一次即可