/**
 * Created by Administrator on 2016/9/19.
 */
var qiniu = require('qiniu');
qiniu.conf.ACCESS_KEY = 'h8OIBtpUPHoMUU03hz63fU8NfHgQ4brAtno9kbjN';
qiniu.conf.SECRET_KEY = 'JRqORkckw7iGjVedNJNSyO5ND-88EmWObL-gOYiU';
bucket = 'zhougy';

//上传到七牛后保存的文件名
key = 'my-nodejs-test.png';

//构建上传策略函数
function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
    return putPolicy.token();
}

//生成上传 Token
token = uptoken(bucket, key);

//要上传文件的本地路径
filePath = './img/1.jpg'

//构造上传函数
function uploadFile(uptoken, key, localFile) {
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
        if(!err) {
            // 上传成功， 处理返回值
            console.log(ret.hash, ret.key, ret.persistentId);
        } else {
            // 上传失败， 处理返回代码
            console.log(err);
        }
    });
}

//调用uploadFile上传
uploadFile(token, key, filePath);
