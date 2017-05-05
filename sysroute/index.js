/**
 * 系统管理员使用的Restful Api
 * Created by lihao on 2017/2/1.
 */
module.exports = function (app) {
    app.use('/', require('./welcome'));
    app.use('/sys/users', require('./users'));
    app.use('/sys/counter', require('./counter'));

}