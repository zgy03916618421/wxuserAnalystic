/**
 * Created by Administrator on 2016/9/11.
 */
var schedule = require('node-schedule');
var request = require('request');
var redis = require('redis');
var client = redis.createClient(6379,'192.168.100.2',function () {

});
//var data = [10,27,30,40,50,60];
var rule = new schedule.RecurrenceRule();
rule.minute = 56;

var j = schedule.scheduleJob(rule, function(){
    request('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxc1a121872c82fa58&secret=c973205ec7f429f1c42d285d89284790',function (err,response,body) {
        var token = JSON.parse(body).access_token;
        client.set('wechat_accesstoken',token,function () {

        })
    })
});