/**
 * Created by Administrator on 2016/8/30.
 */
var router = require('koa-router')();
var C = require('../controller/controller');
router.get('/',C.wxOuath);
router.post('/',C.wxPost);
module.exports = router;