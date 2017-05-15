/**
 * Created by Lihao on 2017/5/15.
 */
const express = require('express');
const router = express.Router();
const moment = require('moment');
const ForumDao = require('../dao/forumDao');

//获取最新的新闻列表
router.get('/getlatest', function (req, res, next) {
    ForumDao.pageQueryLatestPost(0, 20)
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


/*
根据类型获取最新的帖子列表
post接受的body:
{
    type: Number,
    pagenum: Number,
    pagesize: Number
}
*/
router.post('/getbytype', function (req, res, next) {
    let type = req.body.type;
    let pageNum = req.body.pagenum;
    let pageSize = req.body.pagesize;
    ForumDao.pageQueryPostByType(pageNum, pageSize, type)
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

/*
向指定ID的帖子添加评论
post接受的body:
{
    post: ObjectID,
    replyer: ObjectID,
    content: String
}
*/
router.post('/addreply/:postID', function (req, res, next) {
    let postID = req.params.post;
    let replyContent = req.body.content;
    let replyerID = req.body.replyer;
    ForumDao.replyPostByID(postID, replyerID, replyContent)
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

//删除指定ID的回复
router.delete('/deletereply/:replyID', function (req, res, next) {
    let replyID = req.params.replyID;
    ForumDao.deleteReplyByID(replyID)
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

//删除指定ID的帖子
router.delete('/deletereply/:replyID', function (req, res, next) {
    let postID = req.params.postID;
    ForumDao.deletePostByID(postID)
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
        });
});

//获取帖子详情(包含评论)
router.get('/getdetail/:postID', function (req, res, next) {
    ForumDao.getPostAndReplyByID(req.params.postID)
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
        });
});

//根据发帖人ID查询此人发过的帖子
router.get('/getdetailbycreater/:createrID', function (req, res, next) {
    ForumDao.queryPostByCreater(req.params.createrID)
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
        });
});

module.exports = router;