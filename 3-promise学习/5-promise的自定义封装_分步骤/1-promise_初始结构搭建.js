// 实例化构造函数的时候传了一个实参，所以申明构造函数的时候需要申明一个形参
function Promise(executor) {
    
}

// 在promise的原型对象上添加一个 then 方法，then 方法接手两个形参，返回一个promise对象
Promise.prototype.then = function(onResolved, onRejected) {};