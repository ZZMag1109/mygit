const fs = require('fs');
const util = require('util');
const myReadFile = util.promisify(fs.readFile);

// 使用回调函数的方式实现
// fs.readFile('./resource/1.txt', (err, data1) => {
//     if(err) throw err;
//     fs.readFile('./resource/2.txt', (err, data2) => {
//         if(err) throw err;
//         fs.readFile('./resource/3.txt', (err, data3) => {
//             if(err) throw err;
//             console.log(data1 + data2 + data3);
//         })
//     })
// })

// async 与 await函数实现
async function main() {
    try {
        // 读取第一个文件内容
        let data1 = await myReadFile('./resource/1.txt');
        let data2 = await myReadFile('./resource/2.txt');
        let data3 = await myReadFile('./resource/3.txt');

        console.log(data1 + data2 + data3);
    } catch (error) {
        console.log(error);
    }
    
}

main();