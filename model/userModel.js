/**
 * Created by Lihao on 2017/5/1.
 */
//const mongolass = require('./mongolass');
const mongoose = require('./mongoose');
const Schema = mongoose.Schema;
const Conter = require('./codeCounter').Counter;
const moment = require('moment');

let sys_userSchema = Schema({
    user_id: {type: Number, unique: true, default: 10000},
    user_phone: {type: String, unique: true, index: true},
    user_name: {type: String, index: true},
    user_pwd: {type: String, required: true},
    user_email: {type: String,},
    user_desc: {type: String},
    user_type: {type: Number},
    user_head: {type: String},
    create_time: {type: Date},
    update_time: {type: Date},
});

let app_userSchema = Schema({
    user_id: {type: Number, unique: true, default: 10000},
    user_phone: {type: String, unique: true, index: true},
    user_name: {type: String, index: true},
    user_pwd: {type: String, required: true},
    user_email: {type: String,},
    user_desc: {type: String},
    user_type: {type: Number},
    create_time: {type: Date},
    login_time: {type: Date},
});

app_userSchema.pre('save', function (next) {
    let doc = this;
    Conter.findOneAndUpdate({counter_id: 1001}, {$inc: {counter_seq: 1}}, function (error, counter) {
        if (error) {
            return next(error);
        }
        doc.user_id = counter.counter_seq;
        doc.create_time = moment().utcOffset(-8).format('YYYY-MM-DD HH:mm:ss');
        next();
    });
});

const sys_user = mongoose.model('sys_user', sys_userSchema);

const app_user = mongoose.model('app_user', app_userSchema);

exports.SysUser = sys_user;
exports.AppUser = app_user;