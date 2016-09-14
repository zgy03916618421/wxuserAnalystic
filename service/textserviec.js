/**
 * Created by Administrator on 2016/8/30.
 */
var wxAPI= require('./wxapiservice');
var wxToken = require('../utils/wxToken');
exports.textHandle = function *(postBody,token) {
    var token = yield wxToken.getwxToken();
    var openid = postBody.xml.FromUserName[0];
    var content = postBody.xml.Content[0];
    if (content == '晚安'){
        var text = 'https://share.beautifulreading.com/seven/form';
        var msg = yield wxAPI.sendMessage(openid,token,text);
    }
}