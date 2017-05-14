/**
 * Created by lihao on 2017/5/13.
 */
const mongoose = require('./mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

//论坛帖子表
const postSchema = Schema({
    post_title: {type: String, unique: true, required: true},
    post_man: {type: Schema.Types.ObjectId, ref: 'app_user', required: true},
    post_content: {type: String, required: true},
    post_picture: {type: String},
    post_type: {type: Number, required: true, default: 0},
    post_reader: {type: Number, default: 0},
    post_replyed: {type: Number, default: 0},
    post_shotcut: {type: String},
    replys: [{type: Schema.ObjectId, ref: 'post_reply'}],
    create_time: {type: Date}
});

//回帖表
const post_replySchema = Schema({
    author_id: {type: Schema.Types.ObjectId, ref: 'app_user'},
    reply_body: {type: String, default: ''},
    reply_time: {type: Date}
});

const post = mongoose.model('post', postSchema);
const post_reply = mongoose.model('post_reply', post_replySchema);

exports.Post = post;
exports.PostReply = post_reply;