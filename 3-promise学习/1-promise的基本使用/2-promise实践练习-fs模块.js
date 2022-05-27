const fs = require('fs');

//回调函数的形式
// fs.readFile('./resource/content.txt', (err, data) => {
//     // 如果出错，抛出异常
//     if(err) throw err;
//     // 输出文件内容
//     console.log(data.toString());
// })

// Promise形式
let p = new Promise((resolve, reject) => {
    fs.readFile('./resource/content.txt', (err, data) => {
        // 如果出错
        if(err) reject(err);
        // 如果成功
        resolve(data);
    })
});
// 调用then函数，处理异步操作结果
p.then((value) => {
    console.log(value.toString());
}, (reason) => {
    console.log(reason);
})