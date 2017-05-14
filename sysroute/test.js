/**
 * Created by Lihao on 2017/5/14.
 */
const express = require('express');
const router = express.Router();
const UserDao = require('../dao/userDao');
const ForumDao = require('../dao/forumDao');
const moment = require('moment');

router.get('/addpost', function (req, res, next) {
    ForumDao.createPost({
        post_title: '日天论坛的第二条帖子',
        post_man: '590b3d233c7f580cc89b5800',
        post_content: '本文章主要总结了在使用React Native开发过程中遇到的疑难杂症,问题深坑。各种问题的解决方案在不断更新中~如果有各位童鞋已经遇到并且解决掉的问题方案，也希望可以提供给我。React Native技术交流1群:282693535  大家可以加群进行交流或者关注我的微信订阅号',
        post_picture: 'https://staticlive.douyucdn.cn/upload/signs/201705031753327899.jpg',
        create_time: moment().utcOffset(-8).format('YYYY-MM-DD HH:mm:ss')
    })
        .then(function (data) {
            return res.send({
                status: 1,
                data: data
            })
        })
        .catch(function (error) {
            return res.send({
                status: 4,
                data: error.toString()
            })
        });
});

router.get('/getallpost', function (req, res, next) {
    ForumDao.pageQueryLatestPost(0, 20)
        .then(function (data) {
            return res.send({
                status: 1,
                data: data
            })
        })
        .catch(function (error) {
            return res.send({
                status: 4,
                data: error.toString()
            })
        });
});

router.get('/getpostbycreater', function (req, res, next) {
    ForumDao.queryPostByCreater('590b3d233c7f580cc89b5800')
        .then(function (data) {
            return res.send({
                status: 1,
                data: data
            })
        })
        .catch(function (error) {
            return res.send({
                status: 4,
                data: error.toString()
            })
        });
});

router.get('/getpostbyid', function (req, res, next) {
    ForumDao.getPostAndReplyByID('591858ab190def1164b02566')
        .then(function (data) {
            return res.send({
                status: 1,
                data: data
            })
        })
        .catch(function (error) {
            return res.send({
                status: 4,
                data: error.toString()
            })
        });
});

router.get('/addreply', function (req, res, next) {
    ForumDao.replyPostByID('591858ab190def1164b02566', '590b3d233c7f580cc89b5800', '楼主好人!')
        .then(function (data) {
            return res.send({
                status: 1,
                data: data
            })
        })
        .catch(function (error) {
            return res.send({
                status: 4,
                data: error.toString()
            })
        });
});


module.exports = router;