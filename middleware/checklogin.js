/*
* 返回Json的Status:
* 0: 无内容
* 1: 正常
* 9: 未登录
* 404: 资源未找到
* */

module.exports = {
    checkLogin: function checkLogin(req, res, next) {
        if (!req.session.user) {
            console.log('拦截到非法登录!');
            return res.send({
                status: 9,
                error: '您尚未登录,无法进行操作!'
            });
        }
        next();
    },

    checkNotLogin: function checkNotLogin(req, res, next) {
        if (req.session.user) {
            return res.send({
                status: 9,
                error: '您已经登录,无需重复登录!'
            });
        }
        next();
    }
};