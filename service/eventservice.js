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
    var text = '嚯嚯，又来了一个骨骼清奇的人~波叔需要通过以书识人大法对你进行身份扫描，顺带送你几个灵魂伴侣，接好不谢！https://share.beautifulreading.com/bookface';
    var msg = yield wxAPI.sendMessage(openid,token,text);
    //var docs = yield mongodb.collection('userInfo').find({'openid':openid}).toArray();
   // if(docs.length == 0){
        var userinfo = yield wxAPI.getUserInfo(openid,token);
        if(userinfo.errcode == 40001){
            token = yield wxAPI.getwxToken();
            yield redisTemplates.set("wechat_accesstoken",token);
            yield redisTemplates.expire('wechat_accesstoken',3600);
            userinfo = yield wxAPI.getUserInfo(openid,token);
        }
        userinfo.createtime = new Date().format('yyyy-MM-dd hh:mm:ss');
        userinfo.subscribetime = new Date(parseInt(userinfo.subscribe_time)*1000).format('yyyy-MM-dd hh:mm:ss');
        userinfo.status = 'enable';
        mongodb.collection('userinfo').insertOne(userinfo,function () {
            
        });
    //}else{
     //   mongodb.collection('userInfo').updateOne({'openid':openid},{$set : {'status':'enable','subscribetime':new Date().toLocaleString()}},function () {
           
    //    });
   // }
}
function *unsubscribe(content) {
    var openid = content.xml.FromUserName[0];
    var updatetime = new Date().format('yyyy-MM-dd hh:mm:ss');
    mongodb.collection('userinfo').updateOne({'openid':openid,'status':'enable'},{$set : {'status':'disable','createtime':updatetime}},function () {

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
Date.prototype.format = function(format){
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(var k in o) {
        if(new RegExp("("+ k +")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
}