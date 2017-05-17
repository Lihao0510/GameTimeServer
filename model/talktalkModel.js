/**
 * 说说数据模型,暂不支持发送图片
 * Created by Lihao on 2017/5/17.
 */
const mongoose = require('./mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

//微信新闻数据模型
let talktalkSchema = Schema({
    talk_content: { type: String, unique: false, index: true, required: true },
    talk_creater: { type: Schema.ObjectId, ref: 'app_user', index: true, required: true },
    talk_pictrue: { type: String, required: false },
    talk_upvote: { type: Number, default: 0 },
    create_time: { type: Date }
});

//创建时自动添加创建时间
talktalkSchema.pre('save', function (next) {
    let doc = this;
    doc.create_time = moment().utcOffset(-8).format('YYYY-MM-DD HH:mm:ss');
    next();
});

const talktalk = mongoose.model('talk_talk', talktalkSchema);

exports.TalkTalk = talktalk;