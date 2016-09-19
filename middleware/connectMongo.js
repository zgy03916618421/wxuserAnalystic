/**
 * Created by Administrator on 2016/8/28.
 */
var config = require("../config/config");
var MongoClient = require('mongodb').MongoClient;
if(process.env.BS_ENV == 'dev'){
    var _auth = '';
}else{
    var _auth = config.mongo.user+':'+config.mongo.pass+'@';
}
MongoClient.connect('mongodb://192.168.100.2:27017/wechatUser',function (err,db) {
    global.mongodb = db;
    console.log('connect to mongo success!')
})