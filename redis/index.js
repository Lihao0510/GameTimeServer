/**
 * Created by lihao on 2017/5/16.
 */
const redis = require('redis');
const client = redis.createClient(6379, "47.93.58.81", {});

client.on("error", function (err) {
    console.log("Error " + err);
});

client.set("name", "lihao", redis.print);//set "string key" "string val"
client.get("name", redis.print);
/*
 redis.print，回调函数，将redis的返回值显示出来。上一句执行结果，将返回“OK”
 */
client.hset("car", "name", "audi", redis.print);
client.hset("car", "price", 200000, redis.print);
client.hset("car", "color", "white", redis.print);
//遍历哈希表"hash key"
client.hkeys("car", function (err, replies) {
    console.log(replies.length + " replies:");
    replies.forEach(function (reply, i) {
        console.log("    " + i + ": " + reply);
    });
    client.hget("car", "name audi", redis.print);

    /*两种都可以断掉与redis的连接，
     end()很粗暴，不管3721，一下子退出来了，上面那句获取哈希表"hash key"的某个元素值的表达式将没有结果返回
     而quit()则是先将语句处理完毕再干净地退出，斯文得很
     */
    //client.end();
    client.quit();
});