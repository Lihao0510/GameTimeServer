/**
 * Created by Lihao on 2017/5/4.
 */
const mongoose = require('./mongoose');
const Schema = mongoose.Schema;


const code_counterSchema = Schema({
    counter_id: {type: Number, required: true, unique: true},
    counter_seq: { type: Number, default: 10000, required: true }
});

const code_counter = mongoose.model('counter', code_counterSchema);

exports.Counter = code_counter;