/**
 * Created by Administrator on 2016/9/19.
 */
var qiniu = require('node-qiniu');
var request = require('request');
exports.voiceHandle = function *(postBody,token) {
    var mediaid = postBody.xml.MediaId[0];
    var format = postBody.xml.Format[0];
    console.log(format)
    console.log(mediaid);
    mongodb.collection('message').insertOne(postBody);
    qiniu.config({
        access_key : 'h8OIBtpUPHoMUU03hz63fU8NfHgQ4brAtno9kbjN',
        secret_key : 'JRqORkckw7iGjVedNJNSyO5ND-88EmWObL-gOYiU'
    })
    var Bucket = qiniu.bucket('zhougy');
    var puttingStream = Bucket.createPutStream(mediaid+'.'+format);
    request.get('https://api.weixin.qq.com/cgi-bin/media/get?access_token='+token+'&media_id='+mediaid).pipe(puttingStream)
        .on('error', function(err) {
            console.error(err);
        })
        .on('end', function(reply) {
            console.dir(reply);
        });
}