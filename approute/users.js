/**
 * App用户操作Controller
 * 入口: ip:port/users
 * Created by Lihao on 2017/5/1.
 */
const express = require('express');
const router = express.Router();
const moment = require('moment');
const UserDao = require('../dao/userDao');
const sha1 = require('sha1');

//根据用户手机号获取用户信息
router.get('/getbyphone/:phone', function (req, res, next) {

    let phoneNum = req.params.phone;

    UserDao.findAppUserByPhone(phoneNum)
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

    UserDao.findAppUserByNo(userNo)
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

    UserDao.findAppUserByID(userID)
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
    UserDao.getAllAppUser()
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

router.post('/changepwd', function (req, res, next) {
    let userPhone = req.body.userphone;
    let userOriginPwd = req.body.useroldpwd;
    let userNewPwd = req.body.usernewpwd;

    let signedOriginPwd = sha1(userOriginPwd);
    let signedNewPwd = sha1(userNewPwd);

    UserDao.findAppUserByPhone(userPhone)
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
                return UserDao.changeAppUserPwd(userPhone, signedNewPwd)
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
