/**
 * User数据操作类,包含AppUser与SysUser
 * Created by Lihao on 2017/5/1.
 */
var AppUser = require('../model/userModel').AppUser;
var SysUser = require('../model/userModel').SysUser;
const moment = require('moment');

module.exports = {

    //根据电话查找App用户
    findAppUserByPhone: function (userPhone) {
        return AppUser.findOneAndUpdate({
            user_phone: userPhone
        }, {
            $set: {login_time: moment().utcOffset(-8).format('YYYY-MM-DD HH:mm:ss')}
        });
    },

    //根据ID查找App用户
    findAppUserByID: function (userID) {
        return AppUser.findByIdAndUpdate(userID, {
            $set: {login_time: moment().utcOffset(-8).format('YYYY-MM-DD HH:mm:ss')}
        });
    },

    //根据编号查找App用户
    findAppUserByNo: function (userNo) {
        return AppUser.findOneAndUpdate({
            user_id: userNo
        }, {
            $set: {login_time: moment().utcOffset(-8).format('YYYY-MM-DD HH:mm:ss')}
        });
    },

    //注册App用户
    registerAppUser: function (appUser) {
        return AppUser.create(appUser);
    },

    //获取全部App用户
    getAllAppUser: function () {
        return AppUser.find();
    },

    //更改App用户的密码
    changeAppUserPwd: function (userPhone, userPwd) {
        return AppUser.update({
            user_phone: userPhone
        }, {
            $set: {user_pwd: userPwd}
        });
    },

    //根据用户手机号码更新用户头像/详情等信息
    updateAppUser: function (user) {
        return AppUser.update({
            user_phone: user.user_phone
        }, {
            $set: {
                user_desc: user.user_desc,
                user_head: user.user_head,
                user_type: user.user_type
            }
        });
    },

    //根据电话查找系统用户
    findSysUserByPhone: function (userPhone) {
        return SysUser.findOneAndUpdate({
            user_phone: userPhone
        }, {
            $set: {login_time: moment().utcOffset(-8).format('YYYY-MM-DD HH:mm:ss')}
        });
    },

    //根据ID查找系统用户
    findSysUserByID: function (userID) {
        return SysUser.findByIdAndUpdate(userID, {
            $set: {login_time: moment().utcOffset(-8).format('YYYY-MM-DD HH:mm:ss')}
        });
    },

    //根据编号查找系统用户
    findSysUserByNo: function (userNo) {
        return SysUser.findOneAndUpdate({
            user_id: userNo
        }, {
            $set: {login_time: moment().utcOffset(-8).format('YYYY-MM-DD HH:mm:ss')}
        });
    },

    //更改用户的等级
    changeUserLevel: function (userPhone, userLevel) {
        return AppUser.findOneAndUpdate({
            user_phone: userPhone
        }, {
            $set: {user_type: userLevel}
        });
    },

    //注册系统用户
    registerSysUser: function (sysUser) {
        return SysUser.create(sysUser);
    },

    //获取全部系统用户
    getAllSysUser: function () {
        return SysUser.find();
    },

    //更改系统用户的密码
    changeSysUserPwd: function (userPhone, userPwd) {
        return SysUser.update({
            user_phone: userPhone
        }, {
            $set: {user_pwd: userPwd}
        });
    },

    //更改系统用户的等级
    changeSysUserLevel: function (userID, userLevel) {
        return SysUser.findOneAndUpdate({
            user_id: userID
        }, {
            $set: {user_type: userLevel}
        });
    },
};