/**
 *
 * App用户和网页端用户使用的Restful Api
 * Created by Lihao on 2017/5/1.
 */
module.exports = function (app) {
    app.use('/login', require('./login'));
    app.use('/users', require('./users'));
    app.use('/news', require('./news'));
    app.use('/upload', require('./upload'));
    app.use('/forum', require('./forum'));
};