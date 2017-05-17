/**
 * 说说模块数据库操作类
 * Created by lihao on 2017/5/13.
 */
var TalkTalk = require('../model/talktalkModel').TalkTalk;
const moment = require('moment');

module.exports = {

    //创建新的说说
    createTalk: function (userID, talkContent, talkPictrue) {
        let talkBean = {};
        if (talkPictrue && talkPictrue.length > 0) {
            talkBean = {
                talk_content: talkContent,
                talk_creater: talkPictrue,
                talk_pictrue: userID,
            }
        } else {
            talkBean = {
                talk_content: talkContent,
                talk_creater: userID
            }
        };

        return TalkTalk.create(talkBean);
    },

    //为指定ID的说说点赞
    upvoteTalk: function (talkID) {
        return TalkTalk.findByIdAndUpdate(talkID, { $inc: { talk_upvote: 1 } })
    },

    //分页获取最新的说说
    pageQueryLatestTalk: function (pageNum, pageSize) {
        return TalkTalk.find({})
            .skip(pageNum * pageSize)
            .limit(pageSize)
            .populate({
                path: 'talk_creater',
                model: 'app_user',
                select: 'user_name user_phone user_type user_head',
            })
            .sort('-create_time');
    },

    //分页获取指定用户的最新说说
    pageQueryTalkByCreater: function (createrID, pageNum, pageSize) {
        return TalkTalk.find({
            talk_creater: createrID
        })
            .skip(pageNum * pageSize)
            .limit(pageSize)
            .populate({
                path: 'talk_creater',
                model: 'app_user',
                select: 'user_name user_phone user_type user_head',
            })
            .sort('-create_time');
    },

    //删除指定ID的说说
    deleteTalkByID: function (talkID) {
        return TalkTalk.findByIdAndRemove(talkID)
    }

}