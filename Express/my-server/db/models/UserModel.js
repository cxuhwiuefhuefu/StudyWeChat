var mongoose = require("mongoose");

// 表结构
var userSchema = new mongoose.SchemaType({// 构造一个SchemaType实例出来 
                                          // 这里面所填的信息它只要是指定我们所存储的字段丶名丶字段数据类型
                                          // 相当于表结构已经定好了 
    user: String,
    pwd: String
})  


// 操作表结构对象的数据模型 只有这个模型才能操作表
var userModel = mongoose.model('userModel', userSchema);


// 导出
module.exports = userModel



