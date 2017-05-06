/**
 * Created by Lihao on 2017/5/5.
 */
var express = require('express');
var router = express.Router();
var moment = require('moment');
var LocalNewsDao = require('../dao/localNewsDao');
var WeixinNewsDao = require('../dao/weixinNewsDao');
var CommentDao = require('../dao/commentDao');

//查找全部本地新闻
router.get('/local/getallnews', function (req, res, next) {
    LocalNewsDao.getAllLocalNews()
        .then(function (data) {
            return res.send({
                status: 1,
                news: data
            })
        })
        .catch(function (error) {
            return res.send({
                status: 4,
                data: error.toString()
            })
        })
});

//分页查找本地新闻
router.post('/local/querynews', function (req, res, next) {
    let pageSize = req.body.pagesize;
    let pageNum = req.body.pagenum;
    LocalNewsDao.getAllLocalNews(pageNum, pageSize)
        .then(function (data) {
            return res.send({
                status: 1,
                news: data
            })
        })
        .catch(function (error) {
            return res.send({
                status: 4,
                data: error.toString()
            })
        })
});

//查找全部微信新闻
router.get('/weixin/getallnews', function (req, res, next) {
    WeixinNewsDao.getAllWeixinNews()
        .then(function (data) {
            return res.send({
                status: 1,
                news: data
            })
        })
        .catch(function (error) {
            return res.send({
                status: 4,
                data: error.toString()
            })
        })
});

//分页查找微信新闻
router.post('/weixin/querynews', function (req, res, next) {
    let pageSize = req.body.pagesize;
    let pageNum = req.body.pagenum;
    WeixinNewsDao.pageQueryWeixinNews(pageNum, pageSize)
        .then(function (data) {
            return res.send({
                status: 1,
                news: data
            })
        })
        .catch(function (error) {
            return res.send({
                status: 4,
                data: error.toString()
            })
        })
});

//新建本地新闻
router.post('/local/create', function (req, res, next) {

    let title = req.body.title;
    let content = req.body.content;
    let type = req.body.type;
    let from = req.body.from;
    let picurl = req.body.picurl;

    LocalNewsDao.createLocalNews({
        news_title: title,
        news_type: type,
        news_content: content,
        news_pic: picurl,
        news_from: from,
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

//新建微信新闻
router.post('/weixin/create', function (req, res, next) {

    let title = req.body.title;
    let newsurl = req.body.newsurl;
    let type = req.body.type;
    let from = req.body.from;
    let picurl = req.body.picurl;

    WeixinNewsDao.createWeixinNews({
        news_title: title,
        news_type: type,
        news_url: newsurl,
        news_pic: picurl,
        news_from: from,
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

//为本地新闻增加评论
router.post('/localcomment/:localNewsID', function (req, res, next) {

    let newsID = req.params.localNewsID;
    let commentbody = req.params.commentbody;
    let userID = req.params.userid;

    CommentDao.addCommentToLocalNews(newsID, commentbody, userID)
        .then(function (newsResult) {
            return res.send({
                status: 1,
                result: '添加评论成功!',
                news: newsResult
            })
        })
        .catch(function (error) {
            return res.send({
                status: 4,
                data: error.toString()
            })
        });
});

//为微信新闻增加评论
router.post('/weixincomment/:weixinNewsID', function (req, res, next) {

    let newsID = req.params.weixinNewsID;
    let commentbody = req.params.commentbody;
    let userID = req.params.userid;

    CommentDao.addCommentToWeixinNews(newsID, commentbody, userID)
        .then(function (newsResult) {
            return res.send({
                status: 1,
                result: '添加评论成功!',
                news: newsResult
            })
        })
        .catch(function (error) {
            return res.send({
                status: 4,
                data: error.toString()
            })
        });
});

//根据ID获取本地新闻详细信息
router.get('/localdetail/:localNewsID', function (req, res, next) {

    let newsID = req.params.localNewsID;
    LocalNewsDao.getLocalNewsByID(newsID)
        .then(function (news) {
            return res.send({
                status: 1,
                result: news
            })
        })
        .catch(function (error) {
            return res.send({
                status: 4,
                data: error.toString()
            })
        });
});

//根据ID获取微信新闻详细信息
router.get('/weixindetail/:weixinNewsID', function (req, res, next) {

    let newsID = req.params.weixinNewsID;
    WeixinNewsDao.getWeixinNewsByID(newsID)
        .then(function (news) {
            return res.send({
                status: 1,
                result: news
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