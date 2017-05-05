/**
 * Created by Lihao on 2017/5/1.
 */
var AppUser = require('../model/userModel').AppUser;
const moment = require('moment');

module.exports = {
    findAppUserByPhone: function (userPhone) {
        return AppUser.findOneAndUpdate({
            user_phone: userPhone
        }, {
            $set: {login_time: moment().utcOffset(-8).format('YYYY-MM-DD HH:mm:ss')}
        });
    },

    registerAppUser: function (appUser) {
        return AppUser.create(appUser);
    },

    getAllAppUser: function () {
        return AppUser.find();
    },

    changePassword: function (userPhone, userPwd) {
        return AppUser.update({
            user_phone: userPhone
        }, {
            $set: {user_pwd: userPwd}
        });
    }
};