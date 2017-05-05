/**
 * Created by Lihao on 2017/5/1.
 */
const mongoose = require('mongoose');
const config = require('config-lite');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoDB);

var db = mongoose.connection;
db.on('error', function (callback) {
    console.log('数据库连接失败!');
});

db.once('open', function (callback) {
    console.log('数据库连接成功!');
});

module.exports = mongoose;