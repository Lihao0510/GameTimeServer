/**
 * Created by Lihao on 2017/5/5.
 */
const LocalNews = require('../model/newsModel').LocalNews;
const moment = require('moment');

module.exports = {

    createLocalNews: function (news) {
        return LocalNews.create(news);
    },

    getLocalNewsByID: function (newsID) {
        return LocalNews.findById(newsID)
            .populate({
                path: 'comments',
                select: 'author_id comment_time comment_body',
                model: 'news_comment',
                populate: {
                    path: 'author_id',
                    model: 'app_user',
                    select: 'user_name user_phone user_type user_head',
                }
            })
    }
};