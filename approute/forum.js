/**
 * Created by Lihao on 2017/5/15.
 */
const express = require('express');
const router = express.Router();
const moment = require('moment');

const ForumDao = require('../dao/forumDao');

router.get('/getlatest', function (req, res, next) {
    ForumDao.pageQueryLatestPost(0, 20)
        .then(function (data) {
            res.send({
                status: 1,
                posts: data
            })
        })
        .catch(function (err) {
            res.send({
                status: 4,
                error: err.toString()
            })
        })
});

module.exports = router;