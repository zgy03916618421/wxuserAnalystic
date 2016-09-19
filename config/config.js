/**
 * Created by Administrator on 2016/8/30.
 */
var config = {
    redis : {
        host: process.env.BS_REDISHOST || '192.168.100.2',
        port : process.env.BS_REDISPORT || 6379
    },
    mongo : {
        host: process.env.BS_MONGOHOST || '192.168.100.2',
        port: process.env.BS_MONGOPORT || '27017',
        db: process.env.BS_MONGODBNAME || 'wechatuser',
        user : process.env.BS_MONGOUSER || 'wechatuser_reader',
        pass : process.env.BS_MONGOPASS || 'N7SpSrzh'
    },
    weixin : {
        appID : 'wx3c1e9fdd84a88826',
        appsecret : '73544f42698c7564deeff273e9ae0091'
    }
}
module.exports = config;