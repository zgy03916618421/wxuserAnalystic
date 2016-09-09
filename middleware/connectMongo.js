/**
 * Created by Administrator on 2016/8/28.
 */
var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb:192.168.100.2:27017/wechatUser',function (err,db) {
    global.mongodb = db;
})