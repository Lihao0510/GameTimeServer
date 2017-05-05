/**
 * Created by Lihao on 2017/5/1.
 */
var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var UserDao = require('../dao/userDao');

/* GET home page. */
router.get('/', function (req, res, next) {
    UserDao.findAppUserByPhone('15051813873')
        .then(function (user) {
            if (!user) {
                res.send({
                    status: 0
                });
                return;
            }
            res.send(user);
            return;
        })
        .catch(function (err) {
            res.send({
                status: 4,
                error: err
            })
        });
});

router.post('/rigister', function (req, res, next) {

    console.log(req.body);

    let userPhone = req.body.userphone;
    let userPwd = req.body.userpwd;
    let userEmail = req.body.useremail;
    let signedPwd = sha1(userPwd);

    UserDao.registerAppUser({
        user_phone: userPhone,
        user_pwd: signedPwd,
        user_email: userEmail
    }).then(function (data) {
        res.send({
            status: 1,
            user: data
        });
    }).catch(function (error) {
        res.send({
            status: 4,
            error: error
        });
    })
});

router.post('/login', function (req, res, next) {

    var userPhone = req.body.userphone;
    var userPwd = req.body.userpwd;

    var signedPwd = sha1(userPwd);

    UserDao.findAppUserByPhone(userPhone)
        .then(function (data) {
            if (!data) {
                return res.send({
                    status: 0
                })
            }
            if (data.user_pwd !== signedPwd) {
                return res.send({
                    status: 4,
                    error: "密码错误!"
                })
            } else {
                return res.send({
                    status: 1,
                    msg: '登陆成功',
                    user: data
                })
            }
        })
        .catch(function (error) {
            return res.send({
                status: 4,
                error: error.toString()
            });
        });

});

router.post('/changepwd', function (req, res, next) {
    var userPhone = req.body.userphone;
    var userOriginPwd = req.body.useroldpwd;
    var userNewPwd = req.body.usernewpwd;

    var signedOriginPwd = sha1(userOriginPwd);
    var signedNewPwd = sha1(userNewPwd);

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
                return UserDao.changePassword(userPhone, signedNewPwd)
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