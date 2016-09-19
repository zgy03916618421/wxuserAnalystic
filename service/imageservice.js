/**
 * Created by Administrator on 2016/9/18.
 */
var wxAPI = require('./wxapiservice');
var qiniu = require('node-qiniu')
exports.imageHandle = function *(postBody,token) {
    var openid = postBody.xml.FromUserName[0];
    var url = postBody.xml.PicUrl[0];
    console.log(url);
    var mediaid = postBody.xml.MediaId[0];
    console.log(mediaid);
    mongodb.collection('message').insertOne({'openid':openid,'msgtype':'image','picurl':url});
    var img = yield wxAPI.getMdia(token,mediaid);
    qiniu.config({
        access_key : 'h8OIBtpUPHoMUU03hz63fU8NfHgQ4brAtno9kbjN',
        secret_key : 'JRqORkckw7iGjVedNJNSyO5ND-88EmWObL-gOYiU'
    })
    var Bucket = qiniu.bucket('zhougy');
    var puttingStream = Bucket.createPutStream('wechat_test');
    img.pipe(puttingStream)
        .on('error', function(err) {
            console.error(err);
        })
        .on('end', function(reply) {
            console.dir(reply);
        });
}