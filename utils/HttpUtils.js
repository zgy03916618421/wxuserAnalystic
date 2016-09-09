/**
 * Created by Administrator on 2016/8/30.
 */
var request = require('request');
exports.request = function *(opts) {
    return new Promise(function (resolve,reject) {
        request(opts,function (err,res,body) {
            if (err) reject(err);
            else resolve(body);
        })
    })
}