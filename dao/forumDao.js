/**
 * Created by lihao on 2017/5/13.
 */
const Post = require('../model/forumModel').Post;
const PostReply = require('../model/forumModel').PostReply;
const moment = require('moment');

module.exports = {

    createPost: function (post) {
        if (post.post_content.length > 100) {
            post.post_shotcut = post.post_content.substring(0, 100);
        } else {
            post.post_shotcut = post.post_content;
        }
        return Post.create(post);
    },

    pageQueryLatestPost: function (pageNum, pageSize) {
        return Post.find({}, 'post_title post_man post_picture post_type post_reader post_replyed post_shotcut create_time')
            .skip(pageNum * pageSize)
            .limit(pageSize)
            .populate({
                path: 'post_man',
                model: 'app_user',
                select: 'user_name user_phone user_type user_head',
            })
            .sort('-create_time');
    },

    pageQueryPostByType: function (pageNum, pageSize, newsType) {
        return Post.find({post_type: newsType}, 'post_title post_man post_picture post_type post_reader post_replyed post_shotcut create_time')
            .skip(pageNum * pageSize)
            .limit(pageSize)
            .sort('-create_time');
    },

    queryPostByCreater: function (creater) {
        return Post.find({post_man: creater}, 'post_title post_man post_picture post_type post_reader post_replyed post_shotcut create_time')
            .sort('-create_time');
    },

    getPostAndReplyByID: function (postID) {
        return Post.findByIdAndUpdate(postID, {$inc: {post_reader: 1}})
        //展开评论信息
            .populate({
                path: 'replys',
                select: 'author_id reply_time reply_body',
                model: 'post_reply',
                //展开评论者信息
                populate: {
                    path: 'author_id',
                    model: 'app_user',
                    select: 'user_name user_phone user_type user_head',
                }
            });
    },

    //删除指定ID的帖子
    deletePostByID: function (postID) {
        return Post.remove({_id: postID})
    },

    //回复指定ID的帖子
    replyPostByID: function (postID, userID, replyBody) {
        //获取当前时区的时间
        let replyTime = moment().utcOffset(-8).format('YYYY-MM-DD HH:mm:ss');
        //在数据库中创建评论
        return PostReply.create({
            author_id: userID,
            reply_body: replyBody,
            reply_time: replyTime
        })
            //将评论的ID添加到新闻的评论列表中
            .then(function addReplyToPost(commentResult) {
                //使用$push方法向comments中添加评论ID
                return Post.findByIdAndUpdate(postID, {
                    $push: {replys: commentResult._id},
                    $inc: {post_replyed: 1}
                })
            });
    },

    //删除指定ID的评论
    deleteReplyByID: function (replyID) {
        return PostReply.remove({_id: replyID})
    }

};