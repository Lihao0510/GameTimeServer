/**
 * Created by Lihao on 2017/5/5.
 */
var express = require('express');
var router = express.Router();
var moment = require('moment');
var localNewsDao = require('../dao/localNewsDao');
var commentDao = require('../dao/commentDao');

router.get('/local/:newsID', function (req, res, next) {

});

router.get('/wechat/:newsID', function (req, res, next) {

});

router.post('/wechatcomment/:newsID', function (req, res, next) {
    let newsID = req.params.newsID;
    let commentBody = req.body.comment;


});

router.post('/localcomment/:newsID', function (req, res, next) {

});

router.get('/testcreatelocal', function (req, res, next) {
    localNewsDao.createLocalNews({
        news_title: '王尼玛出任日天集团CEO',
        news_type: 1,
        news_content: '王尼玛出任日天集团CEO',
        news_pic: 'https://img12.360buyimg.com/cms/jfs/t5173/358/865323864/257251/1d68e907/5907fb36Nde715dda.png',
        news_from: '腾讯新闻',
        create_time: moment().utcOffset(-8).format('YYYY-MM-DD HH:mm:ss')
    })
        .then(function (data) {
            res.send({
                status: 1,
                data: data
            })
        })
        .catch(function (error) {
            res.send({
                status: 4,
                data: error.toString()
            })
        });
});

router.get('/testcomment', function (req, res, next) {
    commentDao.addCommentToLocalNews('590c6da454908c080cfa95a6', '这真TM是个大新闻', '590b3d233c7f580cc89b5800')
        .then(function () {
            res.send({
                status: 1,
                result: '添加评论成功!'
            })
        })
        .catch(function (error) {
            res.send({
                status: 4,
                data: error.toString()
            })
        });
});

router.get('/testpopulate', function (req, res, next){
    localNewsDao.getLocalNewsByID('590c6da454908c080cfa95a6')
        .then(function (news) {
            res.send({
                status: 1,
                result: news
            })
        })
        .catch(function (error) {
            res.send({
                status: 4,
                data: error.toString()
            })
        });
});

module.exports = router;