/**
 * 系统用户操作Controller
 * 入口: ip:port/sys/users
 * Created by Lihao on 2017/5/1.
 */
var express = require('express');
var router = express.Router();
const UserDao = require('../dao/userDao');
var moment = require('moment');
const sha1 = require('sha1');

//根据用户手机号获取用户信息
router.get('/getbyphone/:phone', function (req, res, next) {

    console.log("用户电话:" + req.session.user);
    let phoneNum = req.params.phone;

    if (phoneNum !== req.session.user){
        return res.send({
            status: 4,
            error: '权限不足'
        })
    }

    UserDao.findSysUserByPhone(phoneNum)
        .then(function (user) {
            if (user) {
                return res.send({
                    status: 1,
                    user: user
                })
            } else {
                return res.send({
                    status: 0
                })
            }
        })
        .catch(function (error) {
            return res.send({
                status: 4,
                error: error.toString()
            });
        })

});

//根据用户号码获取用户信息
router.get('/getbyno/:no', function (req, res, next) {

    let userNo = req.params.no;

    UserDao.findSysUserByNo(userNo)
        .then(function (user) {
            if (user) {
                return res.send({
                    status: 1,
                    user: user
                })
            } else {
                return res.send({
                    status: 0
                })
            }
        })
        .catch(function (error) {
            return res.send({
                status: 4,
                error: error.toString()
            });
        })

});

//根据用户ID获取用户信息
router.get('/getbyid/:userID', function (req, res, next) {

    let userID = req.params.userID;

    UserDao.findSysUserByID(userID)
        .then(function (user) {
            if (user) {
                return res.send({
                    status: 1,
                    user: user
                })
            } else {
                return res.send({
                    status: 0
                })
            }
        })
        .catch(function (error) {
            return res.send({
                status: 4,
                error: error.toString()
            });
        })

});

router.get('/getall', function (req, res, next) {
    UserDao.getAllSysUser()
        .then(function (users) {
            if (users) {
                return res.send({
                    status: 1,
                    users: users
                })
            } else {
                return res.send({
                    status: 0
                })
            }
        })
        .catch(function (error) {
            return res.send({
                status: 4,
                error: error.toString()
            });
        })
});

//修改用户密码
router.post('/changepwd', function (req, res, next) {

    let userPhone = req.body.userphone;
    let userOriginPwd = req.body.useroldpwd;
    let userNewPwd = req.body.usernewpwd;

    let signedOriginPwd = sha1(userOriginPwd);
    let signedNewPwd = sha1(userNewPwd);

    UserDao.findSysUserByPhone(userPhone)
        .then(function (data) {
            if (!data) {
                return res.send({
                    status: 0
                })
            }
            if (data.user_pwd !== signedOriginPwd) {
                return res.send({
                    status: 4,
                    error: "原密码错误!"
                })
            } else {
                return UserDao.changeSysUserPwd(userPhone, signedNewPwd)
            }
        })
        .then(function (data) {
            if (data.ok === 1) {
                return res.send({
                    status: 1,
                    msg: '修改成功'
                });
            }else{
                return res.send({
                    status: 4,
                    error: '修改失败'
                });
            }
        })
        .catch(function (error) {
            return res.send({
                status: 4,
                error: error.toString()
            });
        });
});

module.exports = router;
