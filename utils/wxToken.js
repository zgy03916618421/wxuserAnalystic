/**
 * Created by Administrator on 2016/8/30.
 */
var config = require('../config/config');
var httputils = require('./HttpUtils');
var tools = require('./Tools');
var redisTemplate = require('../db/redisTemplate');
exports.getwxToken = function *() {
    var token = yield redisTemplate.get('wechat_accesstoken');
    if (tools.isEmpty(token) ){
        var opts = {
            method: 'GET',
            url: 'https://api.weixin.qq.com/cgi-bin/token',
            qs: {
                grant_type: 'client_credential',
                appid: config.weixin.appID,
                secret: config.weixin.appsecret
            },
        };
        var result = yield httputils.request(opts);
        result = JSON.parse(result);
        token = result.access_token;
        yield redisTemplate.set('wechat_accesstoken', token);
        yield redisTemplate.expire('wechat_accesstoken', 7000);
        return token;
        }
    return token;
    }
