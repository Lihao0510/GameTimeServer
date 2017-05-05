/**
 * Created by Lihao on 2017/5/4.
 */
var express = require('express');
var router = express.Router();
var counterDao = require('../dao/counterDao');

router.get('/', function (req, res, next) {
    counterDao.generateCounter()
        .then(function (data) {
            res.send(data);
        })
        .catch(function (e) {
            res.send(e);
        });
});

module.exports = router;