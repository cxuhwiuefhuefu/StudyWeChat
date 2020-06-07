var {appid, secret} = require('../config/index'); 
var axios = require('axios'); 
var sha1 = require('sha1');




// 请求access_token的接口
// https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET

// 获取jsapi-ticket的接口
// 第一步拿到的access_token 采用http GET方式请求获得jsapi_ticket（有效期7200秒，开发者必须在自己的服务全局缓存jsapi_ticket）：
// https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=jsapi

// 获取ticket的方法函数
async function getTicket() { 
    let tokenUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`;
    let token_data = await axios.get(tokenUrl);
    console.log('token', token_data);
    let access_token = token_data.data.access_token; // 得到access_token 然后拿这个去请求jsapi  
    
    let ticketUrl = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`;
    let ticket_data = await axios.get(ticketUrl); // 得到jsapi_ticket
    console.log('ticket', ticket_data);

    return ticket_data.data.ticket;
}




// 生成随机字符串的函数
var createNonceStr = function() {
    return Math.random().toString(36).substr(2, 15); // 随机数生成转化为36进制然后截取
}




// 生成时间戳
var createTimestamp = function() {
    return parseInt(new Date().getTime() / 1000) + '';
}




// 处理数据格式的方法函数
var row = function(obj) { 
    var keys = Object.keys(obj);
    keys = keys.sort(); // 字典排序
    var newObj = {};
    keys.forEach((key) => {
        newObj[key.toLowerCase()] = obj[key];
    })
    var string = '';
    for(var k in newObj) {
        string += '&' + k + '=' + newObj[k]; 
    }
    string = string.substr(1);
    return string;
}




// 签名生成规则如下：参与签名的字段包括noncestr（随机字符串）, 有效的jsapi_ticket, timestamp（时间戳）, url（当前网页的URL，不包含#及其后面部分） 。
// 对所有待签名参数按照字段名的ASCII码从小到大排序（字典序）后，
// 使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串string1。
// 这里需要注意的是所有参数名均为小写字符。
// 对string1作sha1加密，字段名和字段值都采用原始值，不进行URL 转义。
// 即signature=sha1(string1)。 示例：

// 签名运算 生成signature签名等数据信息的方法
var sign = async function(url) {
    let jsapi_ticket = await getTicket();
    var obj = {
        jsapi_ticket: jsapi_ticket,
        nonceStr: createNonceStr(),
        timestamp: createTimestamp(),
        url: url
    }

    // var keys = Object.keys(obj);
    // keys = keys.sort(); // 字典排序
    // var newObj = {};
    // keys.forEach((key) => {
    //     newObj[key] = obj[key];
    // })
    // var string = '';
    // for(var k in newObj) {
    //     string += '&' + key + '=' + newObj[k]; 
    // }
    // string = string.substr(1);

    // 开发者通过检验signature对请求进行校验（下面有校验方式）。若确认此次GET请求来自微信服务器，
    //     请原样返回echostr参数内容，则接入生效，成为开发者成功，否则接入失败。加密/校验流程如下：
    // 1）将token、timestamp、nonce三个参数进行字典序排序 
    // 2）将三个参数字符串拼接成一个字符串进行sha1加密 
    // 3）开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    // 检验signature的PHP示例代码


    var str = row(obj);
    var signature = sha1(str); // 生成签名
    
    obj.signature = signature;
    obj.appId = appid;
    return obj;
}


module.exports = sign;