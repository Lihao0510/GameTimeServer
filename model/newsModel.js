/**
 * 新闻模块数据模型,包含本地新闻/微信新闻/新闻评论
 * Created by Lihao on 2017/5/5.
 */
const mongoose = require('./mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

//微信新闻数据模型
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

//本地新闻数据模型
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

//新闻评论数据模型
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