/**
 * Created by Lihao on 2017/5/1.
 */
var express = require('express');
var router = express.Router();
var UserModel = require('../model/userModel');
var moment = require('moment');
var UserDao = require('../dao/userDao');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send({
        name: 'Lihao',
        age: 27,
        hobby: 'program',
        mobile: '17786123214'
    });
});

router.get('/getall', function (req, res, next) {
    UserDao.getAllAppUser()
        .then((data) => {
            return res.send(data);
        }).catch((err) => {
        res.send({
            status: 4,
            error: err
        });
    })
});

router.get('/new', function (req, res, next) {
    UserDao.registerAppUser({
        user_id: 10001,
        user_name: 'zhaoritian',
        user_pwd: '123456',
        user_email: 'zhaoritian@163.com',
        user_desc: '赵日天',
        user_type: 1,
        user_phone: '15051813873'
    }).then(function (data) {
        return res.send(data);
    })
        .catch(function (err) {
            res.send({
                status: 4,
                error: err
            });
        });

});

module.exports = router;
