/**
 * Created by lihao on 2017/5/13.
 */
const express = require('express');
const router = express.Router();
const moment = require('moment');
const processUpload = require('../middleware/fileUpload');

router.post('/head', processUpload.single('avatar'), function (req, res, next) {
    if (req.file) {
        return res.send({
            status: 1,
            result: req.file
        })
    } else {
        return res.send({
            status: 0
        })
    }
});

router.post('/picture', processUpload.single('picture'), function (req, res, next) {
    if (req.file) {
        return res.send({
            status: 1,
            result: req.file
        })
    } else {
        return res.send({
            status: 0
        })
    }
});

module.exports = router;