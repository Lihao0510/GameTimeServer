/**
 * 本地新闻数据操作类
 * Created by Lihao on 2017/5/5.
 */
const LocalNews = require('../model/newsModel').LocalNews;
const SysUser = require('../model/userModel').SysUser;
const moment = require('moment');

module.exports = {

    //新建本地新闻, 若新闻原文过长, 截取前100个字符作为简介
    createLocalNews: function (news) {
        if (news.news_content.length > 100) {
            news.news_shotcut = news.news_content.substring(0, 100);
        } else {
            news.news_shotcut = news.news_content;
        }
        return LocalNews.create(news);
    },

    //根据新闻ID获取新闻,并展开新闻中的评论内容与作者信息
    getLocalNewsByID: function (newsID) {
        //每次执行查找后将阅读数自增1
        return LocalNews.findByIdAndUpdate(newsID, {$inc: {news_reader: 1}})
        //展开评论信息
            .populate({
                path: 'comments',
                select: 'author_id comment_time comment_body',
                model: 'news_comment',
                //展开评论者信息
                populate: {
                    path: 'author_id',
                    model: 'app_user',
                    select: 'user_name user_phone user_type user_head',
                }
            });
    },

    //获取全部本地新闻,不分页
    getAllLocalNews: function () {
        return LocalNews.find({}, '_id news_title news_type news_pic news_from create_time news_replyer news_reader news_visible')
            .sort('-create_time');
    },

    //根据分页参数获取一定数目的本地新闻
    pageQueryLocalNews: function (pageNum, pageSize) {
        return LocalNews.find({
            news_visible: 1
        })
            .skip(pageNum * pageSize)
            .limit(pageSize)
            .sort('-create_time');
    },

    //删除指定ID的本地新闻
    deleteLocalNews: function (newsIDArr) {
        return LocalNews.remove({_id: {$in: newsIDArr}})
    },

    //删除全部新闻,需要提供userID辨别权限
    deleteAllLocalNews: function (userID) {
        return SysUser.findById(userID)
            .then(function (user) {
                if (!user || user.user_type <= 5) {
                    throw new Error('你没有操作权限!')
                }
                return LocalNews.remove({})
            })
    }
};