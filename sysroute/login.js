/**
 * Created by Lihao on 2017/5/1.
 */
var express = require('express');
var router = express.Router();
var sha1 = require('sha1');
var UserDao = require('../dao/userDao');

router.post('/rigister', function (req, res, next) {

    console.log(req.body);

    let userPhone = req.body.userphone;
    let userPwd = req.body.userpwd;
    let userEmail = req.body.useremail;
    let signedPwd = sha1(userPwd);

    UserDao.registerSysUser({
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

    UserDao.findSysUserByPhone(userPhone)
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
                req.session.user = userPhone;
                req.session.login = true;
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




module.exports = router;