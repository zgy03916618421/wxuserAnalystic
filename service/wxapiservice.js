/**
 * Created by Administrator on 2016/8/30.
 */
var httputil = require('../utils/HttpUtils');
var config = require('../config/config');
exports.getUserInfo = function *(openid,token) {
    var opts = {
        method: 'GET',
        url: 'https://api.weixin.qq.com/cgi-bin/user/info',
        qs: {
            access_token: token,
            openid: openid
        }
    };
    var userinfo = yield httputil.request(opts);
    return JSON.parse(userinfo);
}
exports.sendMessage = function *(openid,token,text) {
    var opts = {
        method: 'POST',
        url: 'https://api.weixin.qq.com/cgi-bin/message/custom/send',
        qs: {access_token: token},
        headers: {
            'content-type': 'application/json'
        },
        body: {
            touser: openid,
            msgtype: 'text',
            text: {
                'content':text
            }
        },
        json: true
    }
    var messageresult = yield httputil.request(opts);
    return messageresult;
}
exports.getwxToken = function *() {
    var opts = {
        'method' : 'GET',
        'url' : 'https://api.weixin.qq.com/cgi-bin/token',
        'qs' : {
            'grant_type': 'client_credential',
            'appid' : config.weixin.appID,
            'secret' : config.weixin.appsecret
        }
    }
    var tokenres = yield httputil.request(opts);
    var token = JSON.parse(tokenres).access_token;
    return token;
}