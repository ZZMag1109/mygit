// 实例化构造函数的时候传了一个函数类型的实参，所以申明构造函数的时候需要申明一个函数类型的形参，执行器函数
function Promise(executor) {
    /**
     * 1、在实例化对象的时候同步调用执行器函数，实例化对象的时候构造函数里的代码式同步执行的
     * 2、执行器函数在申明的时候申明了两个函数类型的的形参，调用时需要传两个函数类型实参
     * 3、需要申明两个函数类型的参数
     * 4、函数在被调用时传了实参，所以申明时需要申明形参
     */

    // resolve函数
    function resolve(data) {};

    // reject函数
    function reject(data) {};

    executor(resolve, reject);
}

// 在promise的原型对象上添加一个 then 方法，then 方法接手两个形参，返回一个promise对象
Promise.prototype.then = function(onResolved, onRejected) {};