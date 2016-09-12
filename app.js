/**
 * Created by Administrator on 2016/8/28.
 */
var koa = require('koa');
var bodyParse = require('koa-bodyparser');
var config = require('./config/config');
var xmlParser = require('koa-xml-body').default;
var router = require('./router/router');
var HttpUtils = require('./utils/HttpUtils');
var redisTemplates = require('./db/redisTemplate');
var MongClient = require('mongodb').MongoClient;
var logger = require('koa-logger')
require('./middleware/connectRedis');
var app = koa();
app.use(function *(next) {
    var token = yield redisTemplates.get("wechat_accesstoken");
    /*if (token == null){
        var opts = {
            'method' : 'GET',
            'url' : 'https://api.weixin.qq.com/cgi-bin/token',
            'qs' : {
                'grant_type': 'client_credential',
                'appid' : config.weixin.appID,
                'secret' : config.weixin.appsecret
            }
        }
        var tokenres = yield HttpUtils.request(opts);
        token = JSON.parse(tokenres).access_token;
        yield redisTemplates.set("wechat_accesstoken",token);
        yield redisTemplates.expire('wechat_accesstoken',3600);
    }*/
    this.request.token = token;
    yield next;
});
app.use(function *(next) {
    global.mongodb = yield MongClient.connect('mongodb://192.168.100.2:27017/wechatUser');
    yield next;
})
app.use(xmlParser());
app.use(bodyParse());
app.use(router.routes()).use(router.allowedMethods());
require('./middleware/connectRedis');
app.listen(10000);