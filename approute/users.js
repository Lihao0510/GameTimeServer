/**
 * App用户操作Controller
 * 入口: ip:port/users
 * Created by Lihao on 2017/5/1.
 *
 user_id: {type: Number, unique: true, default: 10000},
 user_phone: {type: String, unique: true, index: true},
 user_name: {type: String, index: true},
 user_pwd: {type: String, required: true},
 user_email: {type: String,},
 user_desc: {type: String},
 user_type: {type: Number, default: 0},
 user_head: {type: String},
 create_time: {type: Date},
 update_time: {type: Date},
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

//获取全部用户，App是否需要该接口待定
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

//App用户更改密码
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

//修改用户其他资料，暂未测试
router.post('/update', function (req, res, next) {
    let user = req.body;
    UserDao.updateAppUser(user)
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
