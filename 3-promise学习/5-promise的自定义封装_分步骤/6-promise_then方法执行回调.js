// 实例化构造函数的时候传了一个函数类型的实参，所以申明构造函数的时候需要申明一个函数类型的形参，执行器函数
function Promise(executor) {

    // 为实例添加属性PromiseState、PromiseResult,因为修改实例的属性才不会影响各个promise实例之间的关系
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    // 保存实例对象this的值
    const self = this;

    /**
     * 1、在实例化对象的时候同步调用执行器函数，实例化对象的时候构造函数里的代码式同步执行的
     * 2、执行器函数在申明的时候申明了两个函数类型的的形参，调用时需要传两个函数类型实参
     * 3、需要申明两个函数类型的参数
     * 4、函数在被调用时传了实参，所以申明时需要申明形参
     */

    // resolve函数,resolve函数是直接调用的，所以this指向为window
    function resolve(data) {
        // 判断状态，状态只能修改一次，只能从pending->fulfilled或者pending->rejected
        if (self.PromiseState !== 'pending') return;
        // 1.修改实例对象的状态（promiseState）
        self.PromiseState = 'fulfilled';
        // 2.设置实例对象的结果值（promiseResult）
        self.PromiseResult = data;
    };

    // 箭头函数没有自己的this,this会指向外层作用域的this,外层作用域的this指向实例对象
    // resolve = (data) => {
    //     // 1.修改实例对象的状态（promiseState）
    //     this.PromiseState = 'fulfilled';
    //     // 2.设置实例对象的结果值（promiseResult）
    //     this.PromiseResult = data;
    // }

    // reject函数
    function reject(data) {
        // 判断状态，状态只能修改一次，只能从pending->fulfilled或者pending->rejected
        if (self.PromiseState !== 'pending') return;
        // 1.修改实例对象的状态（promiseState）
        self.PromiseState = 'rejected';
        // 2.设置实例对象的结果值（promiseResult）
        self.PromiseResult = data;
    };

    // 箭头函数没有自己的this,this会指向外层作用域的this,外层作用域的this指向实例对象
    // reject = (data) => {
    //     // 1.修改实例对象的状态（promiseState）
    //     this.PromiseState = 'rejected';
    //     // 2.设置实例对象的结果值（promiseResult）
    //     this.PromiseResult = data;
    // }

    try {
        // 同步调用执行器函数
        executor(resolve, reject);
    } catch (e) {
        // 修改promise对象状态为失败
        reject(e);
    }
}

// 在promise的原型对象上添加一个 then 方法，then方法调用时传了两个函数类型的实参，所以then 方法申明时要申明两个函数类型的形参，返回一个promise对象
Promise.prototype.then = function(onResolved, onRejected) {
    // 调用回调函数
    // 因为then方法是 Promise newd出来的实例对象调用的，所以then方法中的this指向的是p实例对象
    if(this.PromiseState == 'fulfilled') {
        // onResolve方法申明时申明了一个形参，调用时要传递一个实参
        onResolved(this.PromiseResult);
    }
    if(this.PromiseState == 'rejected') {
        onRejected(this.PromiseResult);
    }
};