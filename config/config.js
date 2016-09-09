/**
 * Created by Administrator on 2016/8/30.
 */
var config = {
    redis : {
        host : '192.168.100.2',
        port : 6379
    },
    mongo : {
        host : '192.168.100.2',
        port : '27017',
        db : 'wechatUser'
    },
    weixin : {
        appID : 'wxc1a121872c82fa58',
        appsecret : 'c973205ec7f429f1c42d285d89284790'
    }
}
module.exports = config;