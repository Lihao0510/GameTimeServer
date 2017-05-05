/**
 * Created by Lihao on 2017/5/5.
 */
const Comment = require('../model/newsModel').NewsComment;
const LocalNews = require('../model/newsModel').LocalNews;
const moment = require('moment');

module.exports = {

    addCommentToLocalNews: function (newsID, commentBody, userID) {
        let commentTime = moment().utcOffset(-8).format('YYYY-MM-DD HH:mm:ss');
        let commentOID = '';
        return Comment.create({
            author_id: userID,
            comment_body: commentBody,
            comment_time: commentTime
        })
            .then(function (data) {
                console.log('1:' + data);
                commentOID = data._id;
                return LocalNews.findByIdAndUpdate(newsID, {$push: {comments: commentOID}})
            })
            .then(function (data) {
                console.log('2:' + data);
            })
    }

};