function Promise(executor) {
    // 在promise的实例上添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    // 申明一个属性接收 then 方法中的回调函数
    this.callback = [];
    /*
    因为 resolve 函数时实例化promise对象时传递的实参，在传递实参时直接调用的，所以在构造函数中直接声明一般函数resolve时，函数的this指向为window
    解决方法：
      1、在构造函数中保存this,在一般函数中使用；
      2、将resolve函数申明成箭头函数  
    */
   const _this = this;
    // resolve函数,调用时传递了一个实参，需要声明一个形参
    function resolve(data) {
        // 判断状态，PromiseState的状态只能修改一次
        if (_this.PromiseState !== 'pending' ) return;
         // 1、修改对象的状态 (promiseState，属于promise实例身上的属性)
         _this.PromiseState = 'fulfilled';
         // 2、设置对象结果值 (promiseResult，属于promise实例身上的属性)
         _this.PromiseResult = data;
        //  异步执行excutor执行器函数时，调用成功的回调函数
        _this.callback.forEach(item => {
            item.onResolved(data);
        })
    }
    // 申明成箭头函数
    // resolve = (data) => {
    //     //判断状态，PromiseState的状态只能修改一次
    //      if (this.PromiseState !== 'pending' ) return;
    //     // 1、修改对象的状态 (promiseState，属于promise实例身上的属性)
    //     this.PromiseState = 'fulfilled';
    //     // 2、设置对象结果值 (promiseResult，属于promise实例身上的属性)
    //     this.PromiseResult = data;
    // };
    // reject函数，调用时传递了一个实参，需要声明一个形参
    function reject(data) {
        // 判断状态，promiseState的状态只能修改一次
        if (_this.PromiseState !== 'pending' ) return;
        // 1、修改对象的状态 (promiseState，属于promise实例身上的属性)
        _this.PromiseState = 'rejected';
        // 2、设置对象结果值 (promiseResult，属于promise实例身上的属性)
        _this.PromiseResult = data;
        //  异步执行excutor执行器函数时，调用失败的回调函数
        _this.callback.forEach(item => {
            item.onRejected(data);
        })
    };
    // 申明成箭头函数
    // reject = (data) => {
    //     //判断状态，promiseState的状态只能修改一次
    //      if (this.PromiseState !== 'pending' ) return;
    //     // 1、修改对象的状态 (promiseState，属于promise实例身上的属性)
    //     this.PromiseState = 'rejected';
    //     // 2、设置对象结果值 (promiseResult，属于promise实例身上的属性)
    //     this.PromiseResult = data;
    // }
    
    try{
        // 同步调用执行器函数,调用时需要传递两个函数类型的实参，所以需要申明两个函数类型的形参
        executor(resolve, reject);
    }catch(e) {
        reject(e);
    }
                                                                              
}

// 在promise构造函数的原型对象上添加then方法,then方法返回的是一个promise对象
Promise.prototype.then = function(onResolved, onRejected) {
    const self = this;
    return new Promise((resolve, reject) => {
         // 调用回调函数，判断PromiseState的值进行调用
        // then方法是实例对象p直接调用，所以，then方法中的this为p实例对象
        if(this.PromiseState === 'fulfilled') {
            try {
                 // 申明时传了一个参数，需要在调用时接受一个实参
                let result = onResolved(this.PromiseResult);
                // 判断返回类型
                if (result instanceof Promise) {
                    // 如果是Promise类型的对象
                    result.then(value => {
                        resolve(value);
                    }, reason => {
                        reject(reason);
                    })
                } else {
                    // 结果的promise对象状态PromiseState为【成功】,结果值PromiseResult为回调函数的返回值；
                    resolve(result);
                }
            } catch(e) {
                reject(e);
            }
        }
        if(this.PromiseState === 'rejected') {
            
            onRejected(this.PromiseResult);
        }
        // 判断pending状态
        if(this.PromiseState === 'pending') {
            /*
            因为excutor执行器函数内部是同步改变PromiseState的状态，那调用then方法的同时调用回调函数
            但是，如果excutor执行器函数内部是异步改变PromiseState的状态，那调用resolve/reject改变PromiseState的值时才调用回调函数
            所以，此处应该保存回调函数
            */
            this.callback.push({
                onResolved: function() {
                    try {
                         // 执行成功的回调
                        let result = onResolved(self.PromiseResult);
                        // 判断结果
                        if (result instanceof Promise) {
                            result.then(value => {
                                resolve(value);
                            },reason => {
                                reject(reason);
                            })
                        }else {
                            resolve(result);
                        }
                    } catch(e) {
                        reject(e);
                    }
                },
                onRejected: function() {
                    try {
                         // 执行成功的回调
                        let result = onRejected(self.PromiseResult);
                        // 判断结果
                        if (result instanceof Promise) {
                            result.then(value => {
                                resolve(value);
                            },reason => {
                                reject(reason);
                            })
                        }else {
                            resolve(result);
                        }
                    } catch (e) {
                        reject(e);
                    }
                }
            });  
        }
    })
}