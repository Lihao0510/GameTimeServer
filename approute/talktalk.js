/**
 * 说说Controller
 * Created by Lihao on 2017/5/17.
 */
var express = require('express');
var router = express.Router();
var TalktalkDao = require('../dao/talktalkDao');

//当没有图片时,请传入''空字符串
router.post('/create', function (req, res, next) {
    let talkContent = req.body.content;
    let talkCreater = req.body.creater;
    let talkPicture = req.body.picture;
    TalktalkDao.createTalk(talkCreater, talkContent, talkPicture)
        .then(function (data) {
            res.send({
                status: 1,
                data: data
            })
        })
        .catch(function (err) {
            res.send({
                status: 4,
                error: err.toString()
            })
        })
});

//分页获取最新说说
router.get('/getlatest/:page', function (req, res, next) {
    let pageNum = req.params.page;
    TalktalkDao.pageQueryLatestTalk(pageNum, 20)
        .then(function (data) {
            res.send({
                status: 1,
                data: data
            })
        })
        .catch(function (err) {
            res.send({
                status: 4,
                error: err.toString()
            })
        })
});

//分页获取指定用户的说说
router.get('/getbycreater/:creater/:page', function (req, res, next) {
    let createrID = req.params.creater;
    let pageNum = req.params.page;
    TalktalkDao.pageQueryTalkByCreater(createrID, pageNum, 20)
        .then(function (data) {
            res.send({
                status: 1,
                data: data
            })
        })
        .catch(function (err) {
            res.send({
                status: 4,
                error: err.toString()
            })
        })
});

//删除指定ID的说说
router.get('/deletetalk/:talkID', function (req, res, next) {
    let talkID = req.params.talkID;
    //TODO: 此处应再判断权限
    TalktalkDao.deleteTalkByID(talkID)
        .then(function (data) {
            res.send({
                status: 1,
                data: data
            })
        })
        .catch(function (err) {
            res.send({
                status: 4,
                error: err.toString()
            })
        })
});

//为指定ID的说说点赞
router.get('/upvote/:talkID', function (req, res, next) {
    let talkID = req.params.talkID;
    TalktalkDao.upvoteTalk(talkID)
        .then(function (data) {
            res.send({
                status: 1,
                data: data
            })
        })
        .catch(function (err) {
            res.send({
                status: 4,
                error: err.toString()
            })
        })
})

module.exports = router;