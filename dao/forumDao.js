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
        
    },
    
    pageQueryPostByType: function (pageNum, pageSize, newsType) {
        
    },
    
    pageQueryPostByCreater: function () {
        
    }
    
};