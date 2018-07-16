var express = require('express');
var fs = require('fs');
var proxyConfig = require('./proxy_config.js');// 引入代理逻辑
var router = express.Router();//注意执行
/*
 * RESTful 路由
 */
//router.get('/token', proxy.token);

// 下面文件执行逻辑在于当本地请求有符合proxy_config里面配置的正则，就会被代理到本地并且读取本地对应json文件返回相应json数据
for(var i=0; i<proxyConfig.length; i++) {
    (function(i){
        router[proxyConfig[i].method || 'post'](proxyConfig[i].reg, function(req, res, next){
            fs.readFile(__dirname + proxyConfig[i].local, 'utf8', function (err, data) {
                if(err) throw err;
                res.status(200);
                res.send(JSON.parse(data));
            });
        });
    })(i)
}

module.exports = router;