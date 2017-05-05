/**
 * Created by Lihao on 2017/5/5.
 */
const mongoose = require('./mongoose');
const Schema = mongoose.Schema;
const Conter = require('./codeCounter').Counter;
const moment = require('moment');

let weixinNewsSchema = Schema({
    news_title: {type: String, unique: true, index: true},
    news_type: {type: Number, index: true},
    news_url: {type: String, required: true},
    news_pic: {type: String},
    news_from: {type: String},
    news_reader: {type: Number, default: 0},
    comments: [{type: Schema.ObjectId, ref: 'news_comment'}],
    create_time: {type: Date}
});

let localNewsSchema = Schema({
    news_title: {type: String, unique: true, index: true},
    news_type: {type: Number, index: true},
    news_content: {type: String, required: true},
    news_pic: {type: String},
    news_from: {type: String},
    news_reader: {type: Number, default: 0},
    comments: [{type: Schema.ObjectId, ref: 'news_comment'}],
    create_time: {type: Date}
});

let commentSchema = Schema({
    author_id: {type: Schema.Types.ObjectId, ref: 'app_user'},
    comment_body: {type: String, default: ''},
    comment_time: {type: Date}
});

const weixinNews = mongoose.model('weixin_news', weixinNewsSchema);
const localNews = mongoose.model('local_news', localNewsSchema);
const newsComment = mongoose.model('news_comment', commentSchema);

exports.WeixinNews = weixinNews;
exports.LocalNews = localNews;
exports.NewsComment = newsComment;