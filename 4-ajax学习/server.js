// 1、引入express框架
const express = require('express');
// 2、创建应用对象
const app = express();
// 3、创建路由规则
app.get('/server',(request, response) => {
    // 设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    // 设置响应
    response.send('hello, ajax!')
});

app.post('/server',(request, response) => {
    // 设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    // 设置响应
    response.send('hello, ajax post!')
});

// 可以接收任意类型的请求
app.all('/json-server',(request, response) => {
    // 设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    // 设置允许请求头中包含自定义的属性
    response.setHeader('Access-control-Allow-Headers','*');
    // 设置响应
    const data = {
        name: 'atguigu-1'
    };
    let str = JSON.stringify(data);
    response.send(str)
});

// 延时响应
app.get('/delay',(request, response) => {
    // 设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    setTimeout(() => {
         // 设置响应
        response.send('hello, ajax-延时!')
    },3000)
});

// jQury服务
app.all('/jQuery-server',(request, response) => {
    // 设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    // 设置允许请求头中包含自定义的属性
    response.setHeader('Access-control-Allow-Headers','*');
    // response.send('Hello jQuery!')
    const data = {
        name: 'atguigu'
    };
    response.send(JSON.stringify(data));
});

// axios服务
app.all('/axios-server',(request, response) => {
    // 设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    // 设置允许请求头中包含自定义的属性
    response.setHeader('Access-control-Allow-Headers','*');
    // response.send('Hello jQuery!')
    const data = {
        name: 'atguigu'
    };
    response.send(JSON.stringify(data));
});

// fetch服务
app.all('/fetch-server',(request, response) => {
    // 设置响应头，设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    // 设置允许请求头中包含自定义的属性
    response.setHeader('Access-control-Allow-Headers','*');
    // response.send('Hello jQuery!')
    const data = {
        name: 'atguigu'
    };
    response.send(JSON.stringify(data));
});



// 4、监听端口启动服务
app.listen(8000, () => {
    console.log('服务已经启动，8000 端口监听中...');
})