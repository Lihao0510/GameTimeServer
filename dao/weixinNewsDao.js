/**
 * 微信新闻数据操作类
 * Created by Lihao on 2017/5/5.
 */
const WeixinNews = require('../model/newsModel').WeixinNews;
const SysUser = require('../model/userModel').SysUser;
const moment = require('moment');

module.exports = {

    //新建本地新闻
    createWeixinNews: function (news) {
        return WeixinNews.create(news);
    },

    //根据新闻ID获取新闻,并展开新闻中的评论内容与作者信息
    getWeixinNewsByID: function (newsID) {
        //每次执行查找后将阅读数自增1
        return WeixinNews.findByIdAndUpdate(newsID, {$inc: {news_reader: 1}})
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
    getAllWeixinNews: function () {
        return WeixinNews.find({})
            .sort('-create_time');
    },

    //根据分页参数获取一定数目的本地新闻
    pageQueryWeixinNews: function (pageNum, pageSize) {
        return WeixinNews.find({
            news_visible: 1
        })
            .skip(pageNum * pageSize)
            .limit(pageSize)
            .sort('-create_time');
    },

    //删除指定ID的微信新闻
    deleteWeixinNews: function (newsID) {
        return WeixinNews.remove({_id: newsID})
    },

    //删除全部微信新闻,需要提供userID辨别权限
    deleteAllWeixinNews: function (userID) {
        return SysUser.findById(userID)
            .then(function (user) {
                if (!user || user.user_type <= 5) {
                    throw new Error('你没有操作权限!')
                }
                return WeixinNews.remove({})
            })
    }
};