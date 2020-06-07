## 一丶搭建一个Express开发目录

https://www.expressjs.com.cn/starter/generator.html

目录右键打开 终端打开 
npm install express-generator   生成器工具 利用它提供的命令快速构建一个目录出来

express --no-view my-server

bin目录 www 启动文件
public 资源存放路径
routes 整个服务端路由的文件
app.js  整个项目的入口文件

刚刚生成器只是为我们创建一个目录结构 那这个目录结构里面它其实有很多第三方的依赖包 打开package.json 里面其实有很多用来需要我们去安装的（depencies） 否做这个项目是无法正常运行起来的 

npm i  快速安装完毕   （会报错 装依赖）

执行一个启动命令 将服务跑起来

cd my-server

应该在my-server目录下安装依赖  npm i   ==>  package-lock.json  mode-modules

npm run start




出现很多使用node犯的错误
1. 安装express生成器
`npm i -g express-generator`

2. 使用express命令初始化项目结构
`express --no-view 项目名称`

3. 在命令行中指定到项目目录下，并安装我们的依赖
`npm i` 

4. 启动express服务
```
npm run start
``` 

哪里去访问？？
打开bin目录下的www文件  
`var port = normalizePort(process.env.PORT || '3000');`
端口号在3000端口下面 一般服务启动在localhost下面去的 
`http://localhost:3000`

说明express项目搭建成功




## 二丶Express代码结构及作用

bin --> www 启动服务的文件 

1. www文件    这个文件在项目开发基本是不需要动的
localhost:3000

2. node_modules 第三方包文件夹 一般不需要动的 

3. public  静态资源存放的这样目录  需要发送给前端的图片丶js文件丶样式和页面文件 后期在微信公众号鉴权的过程当中可能会往这个目录里面按照要求放一些其他文件进来 这样前端可以访问到目录下的内容 
动的比较多的是public这个目录 

如何访问 ？？
在前端经常使用相对路径来引用 在服务端开发的时候一定要通过绝对路径

保存之后需要重新启动这个服务器 本次更改才能生效 或者尝试刷新一下 正常改一下服务端的核心代码之后需要重新启动一下

为什么需要写/stylesheets/base.css 是因为app.js中有静态资源托管的代码
`app.use(express.static(path.join(__dirname, 'public')));`
当我们访问`/`路径的时候 它会引导到public文件下去找到我们想要的资源

4. routes 接口文件 用户访问某些路径的时候我们做出对应的响应


Cannot GET /auth 我们没找到这个接口 是因为我们js新增的JS接口或者改了一些JS配置之后 我们是需要重新启动的  

Ctr C 将之前服务停掉

npm run start  重新启动服务 可以访问新的接口

这个接口可以是post类型的接口 接受用户提交上来的数据 在后期做鉴权的时候我们可能需要用户提交数据上来的时候会用post方法

5. app.js 是整个项目相关一些依赖文件或者目录规划 路由整合相关一些信息 绝大部分下也不需要动 

如果需要假如第三方依赖包的时候 需要在这个地方引入

刚才接口文件之所以生效 就是因为在app.js里面将他引入了一下
`app.use('/', indexRouter);`
`app.use('/users', usersRouter);`

将入口文件做一些核心配置操作



如何在前端提交数据 ？？
可以尝试一下使用postman



## 三丶mongodb相关操作
启动数据库

启动成功标志
Listening  on  127.0.0.1
port 20717

好连接数据库去使用

先通过可视化的连接工具 去尝试连接一下

RObo3T


1. 下载并安装MongoDB数据库环境 【参考千峰nodejs课程】
2. 通过`mongod`命令启动数据库
3. 下载并安装Robo3T可视化工具
4. 通过Robo3T工具连接已经启动的MongoDB数据库
5. 使用mongoose模块，实现Express服务与MongoDB数据库的链接等操作 【也可以使用命令行方式操作数据库】


使用express和数据库发生一些交互 express是用户提供接口的地方 只有用户访问我们的接口 我们才能拿到数据

必须经过服务端才可以操作数据库 前端没有能力操作数据库的


127.0.0.1 等价于localhost


需要在express里面和数据库发生一些交互 express只是用户提供接口的地方 只有用户访问我们的接口 我们才能拿到数据



## 四丶 mongoose模块的连接与使用

npm i mongoose 安装mongoose模块到这个项目里面去

安装完之后可以提供mongoose模块提供的一些方法 对我们的数据库进行一个连接

为了保证mongoose里面的操作跟我们原有的其它目录比较方便维护 可以专门新建一个文件夹db 我们数据库操作相关的文件 我们都放在db这个文件夹里面去 在里面新建connect.js连接我们的数据库

数据库连接成功代表我们已经在myserver里面通过代码去操作我们mongose数据库了 
你要想增一条数据 你需要有一个所谓的模型（Models） 模型（Models）又依赖我们模式类型(SchemaTypes) 你需要模式类型和模型这两个东西你数据库进行相应的操作

当用户请求我们某个接口的时候 我们向数据库里面新增一条数据

先新增一个schemaTypes 然后让Model引用我们schemaTypes类 待会我们通过操作model的方式去往数据库里面新增内容 

因为我们整个启动的时候 我们经过我们的app.js 数据库就已经连接成功了 当用户在访问其他接口的时候 我们数据库已经是一种连接状态 我们只需要做数据的操作就可以了 

看前端如何发数据给后端接口 后端接口拿到这个数据之后是如何保存到我们数据库里面去

新建models文件夹UserModel.js 里面存放所有的 我们用来去操作数据库的一些方法模型 里面可以学存储用户信息

npm i sha1  安装模块




## 鉴权所需要的jsapi-ticket
utils 鉴权相关的代码

封装一个方法向这个借口发起一个请求
https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET

为了后面本地测试方便 我们可以将IP也在微信公众号的白名单里面 需要把本地的IP加入微信的白名单  

为什么后端拿到token和tiket 为什么前端拿不到这些获取的信息呢 且是空对象

如果有同步的代码 在方法前面async 在调用方法的时候加上await 完全保证只有拿到结果才会进入到下面 不然结果还没拿到就扔出去了

为什么url是undefined？是因为我直接访问它了 如何测试它 请求拿到index.html这个页面 然后将中国页面帮我们去请求这些数据




## 鉴权接口在线部署和测试
用户请求jsapi的接口能够拿到wx.config()初始化所需要的全部信息 接下来是将信息填写wx.config里面去 然后wx.ready之后测试调用这些方法

点击二维码扫描这行字的时候 我们就能够在微信的公众号平台环境下调二维码

将所有进行微信配置的代码迁移到我们vue里面去

认证费

