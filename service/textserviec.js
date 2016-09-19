/**
 * Created by Administrator on 2016/8/30.
 */
var wxAPI= require('./wxapiservice');
exports.textHandle = function *(postBody,token) {
    var openid = postBody.xml.FromUserName[0];
    var content = postBody.xml.Content[0];
    switch (content){
        case '书签':
            var text = '波叔每天都有更新书签哦，不过微信后台覆盖到全部用户要24小时。你也可以移步「美丽阅读」app，定时同步更新。';
            var msg = yield wxAPI.sendMessage(openid,token,text);
            break
        case '以书识人':
            var text = 'https://share.beautifulreading.com/bookface';
            var msg = yield wxAPI.sendMessage(openid,token,text);
            break
        default:
            break
    }
//    if (content == '书签'){
//        var text = '波叔每天都有更新书签哦，不过微信后台覆盖到全部用户要24小时。你也可以移步「美丽阅读」app，定时同步更新。';
//        var msg = yield wxAPI.sendMessage(openid,token,text);
 //   }
    mongodb.collection('message').insertOne({'openid':openid,'msgtype':'text','message':content})
}