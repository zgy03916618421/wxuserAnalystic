/**
 * Created by Administrator on 2016/8/30.
 */
var S = require('../service/wxcheckservice');
var eventService = require('../service/eventservice');
var textService = require('../service/textserviec');
var imageService= require('../service/imageservice');
var voiceService = require('../service/voiceservice');
exports.wxOuath = function *() {
    var echostr = this.query.echostr;
    var signature = this.query.signature;
    var timestamp = this.query.timestamp;
    var nonce = this.query.nonce;
    var isCheck = S.wxcheckSignature(signature,timestamp,nonce);
    if (isCheck) this.body = echostr;
    else this.body = 'failed';
}
exports.wxPost = function *() {
    var xml = this.request.body;
    var msgType = xml.xml.MsgType[0];
    var token = this.request.token;
    switch (msgType){
        case 'event':
            yield eventService.eventHandle(xml,token);
            this.body = 'success';
            break
        case 'text':
            yield textService.textHandle(xml,token);
            this.body = 'success';
            break
        case 'image':
            yield imageService.imageHandle(xml,token);
            this.body = 'success';
            break
        case  'voice':
            yield voiceService.voiceHandle(xml,token);
            this.body = 'success';
            break
        default:
            this.body = 'success';
    }
}