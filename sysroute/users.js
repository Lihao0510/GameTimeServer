var express = require('express');
var router = express.Router();
var UserModel = require('../model/userModel');
var SysUser = UserModel.SysUser;
var AppUser = UserModel.AppUser;
var moment = require('moment');
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send({
        name: 'Lihao',
        age: 27,
        hobby: 'program',
        mobile: '17786123214',
    });
});

router.get('/getall', function (req, res, next) {
    AppUser
        .find()
        .exec()
        .then(function (data) {
            res.send(data);
        })
        .catch(function (err) {
            res.send(err);
        });
});

router.get('/new', function (req, res, next) {
    AppUser
        .create({
            user_id: 10001,
            user_name: 'zhaoritian',
            user_pwd: '123456',
            user_email: 'zhaoritian@163.com',
            user_desc: '赵日天',
            user_type: 1
        })
        .exec()
        .then(function (data) {
            res.send(data);
        })
        .catch(function (err) {
            res.send(err);
        });

});

module.exports = router;
