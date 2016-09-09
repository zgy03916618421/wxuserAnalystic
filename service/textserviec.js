/**
 * Created by Administrator on 2016/8/30.
 */
var wxToken = require('../utils/wxToken');
exports.textHandle = function *(postBody) {
    var token = yield wxToken.getwxToken();
    var openid = postBody.xml.FromUserName[0];
    var content = postBody.xml.Content[0];

}