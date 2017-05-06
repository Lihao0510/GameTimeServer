/**
 * Created by Lihao on 2017/5/4.
 */
var Counter = require('../model/codeCounter').Counter;

module.exports = {
    generateCounter: function () {
        return Counter.create({
            counter_id: 1002
        })
    }
};