/**
 * Created by Lihao on 2017/5/5.
 */
const Comment = require('../model/newsModel').NewsComment;
const LocalNews = require('../model/newsModel').LocalNews;
const WeixinNews = require('../model/newsModel').WeixinNews;
const moment = require('moment');

module.exports = {

    //为本地新闻添加评论,返回查询新闻的Promise
    addCommentToLocalNews: function (newsID, commentBody, userID) {
        //获取当前时区的时间
        let commentTime = moment().utcOffset(-8).format('YYYY-MM-DD HH:mm:ss');
        //在数据库中创建评论
        return Comment.create({
            author_id: userID,
            comment_body: commentBody,
            comment_time: commentTime
        })
            //将评论的ID添加到新闻的评论列表中
            .then(function addcommentToNews(commentResult) {
                //使用$push方法向comments中添加评论ID
                return LocalNews.findByIdAndUpdate(newsID, {$push: {comments: commentResult._id}})
            });
    },

    //为微信新闻添加评论,返回查询新闻的Promise
    addCommentToWeixinNews: function (newsID, commentBody, userID) {
        //获取当前时区的时间
        let commentTime = moment().utcOffset(-8).format('YYYY-MM-DD HH:mm:ss');
        //在数据库中创建评论
        return Comment.create({
            author_id: userID,
            comment_body: commentBody,
            comment_time: commentTime
        })
            //将评论的ID添加到新闻的评论列表中
            .then(function addcommentToNews(commentResult) {
                //使用$push方法向comments中添加评论ID
                return WeixinNews.findByIdAndUpdate(newsID, {$push: {comments: commentResult._id}})
            });
    }

};