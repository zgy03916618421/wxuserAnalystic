/**
 * Created by Administrator on 2016/8/30.
 */
var cryPto = require('crypto');
exports.wxcheckSignature = function *(signature,timestamp,nonce) {
    var token='zgy';
    var tempArr=[token,timestamp,nonce];
    tempArr.sort();
    var tempStr=tempArr.join('');
    var sha1=cryPto.createHash('sha1');
    sha1.update(tempStr,'utf8');
    tempStr=sha1.digest('hex');
    if(tempStr==signature){
        return true
    }else {
        return false;
    }
}