/**
 * Created by Administrator on 2016/8/30.
 */
var wxAPI = require('./wxapiservice');
var redisTemplates = require('../db/redisTemplate');
var envet = {
    'subscribe' : subscribe,
    'unsubscribe' : unsubscribe,
    'CLICK' : click,
    'VIEW' : view,
    'LOCATION' : location,
    'SCAN' : scan
}
exports.eventHandle = function *(postBody,token) {
    var type = postBody.xml.Event[0];
    yield envet[type](postBody,token);
}
function *subscribe(content,token) {
    var openid = content.xml.FromUserName[0];
    var text = '你好';
    var msg = yield wxAPI.sendMessage(openid,token,text)
    var docs = yield mongodb.collection('test').find({'openid':openid}).toArray();
    if(docs.length == 0){
        var userinfo = yield wxAPI.getUserInfo(openid,token);
        if(userinfo.errcode == 40001){
            token = yield wxAPI.getwxToken();
            yield redisTemplates.set("wechat_accesstoken",token);
            yield redisTemplates.expire('wechat_accesstoken',3600);
            userinfo = yield wxAPI.getUserInfo(openid,token);
        }
        userinfo.createtime = new Date().toLocaleString();
        userinfo.subscribetime = new Date(parseInt(userinfo.subscribe_time)*1000).toLocaleString();
        userinfo.status = 'enable';
        mongodb.collection('test').insertOne(userinfo,function () {
            mongodb.close();
        });
    }else{
        mongodb.collection('test').updateOne({'openid':openid},{$set : {'status':'enable','subscribetime':new Date().toLocaleString()}},function () {
            mongodb.close();
        });
    }
}
function *unsubscribe(content) {
    var openid = content.xml.FromUserName[0];
    var updatetime = new Date().toLocaleString();
    mongodb.collection('test').updateOne({'openid':openid},{$set : {'status':'disable','createtime':updatetime}},function () {
        mongodb.close();
    });
}
function  *click() {

}
function *view() {

}
function *location() {
    
}
function *scan() {
    
}