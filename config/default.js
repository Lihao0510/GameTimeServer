/**
 * 全局Config文件
 * Created by lihao on 2017/1/30.
 */
module.exports = {
    //session
    cookie: {
        name: 'appuser',
        secret: 'gtcookiekey',
        maxage: '60 * 60 * 24'
    },
    //分页参数
    pageconf: {
        pageSize: 10
    },
    //mongoDB配置
    mongoDB: 'mongodb://localhost:27017/gametime'
}