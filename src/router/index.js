//配置路由
import Vue from 'vue';
import VueRouter from 'vue-router';
//使用插件
Vue.use(VueRouter);
import routes from './routes'
//引入store
import store from '@/store'
//重写push 和 replace 
//先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
//重写push  replace
//第一个参数告诉原来的push方法 往哪里跳转 传递哪些参数
// call apply区别
//相同点：都可以调用函数一次 都可以篡改函数的上下文一次
//不同点：call与apply传递参数：call传递参数要用逗号隔开 apply传递数组
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location.resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location.resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
//配置路由
let router = new VueRouter({
    //配置路由
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})
//全局守卫，前置守卫（在路由跳转之前进行判断）
router.beforeEach(async (to, from, next) => {
    // next:放行函数
    next()
    let token = store.state.user.token
    //用户信息
    let name = store.state.user.userInfo.name
    if (token) {
        //用户已经登录不能login
        if (to.path == '/login') {
            next('/home')
        } else {
            //登录了 但是去的不是login
            //如果用户名已有
            if (name) {
                next()
            } else {
                //没有用户信息 派发action让仓库存储用户信息再跳转
                try {
                    //获取用户信息在首页展示
                    await store.dispatch("getUserInfo");
                    next()
                } catch (error) {
                    //token失效了 应该清除所有信息 重新登录
                    await store.dispatch('userLogout')
                    next('/login')
                }
            }
        }
    } else {
        //用户未登录状态
        let topath = to.path
        if (topath.indexOf('/trade') != -1 || topath.indexOf('/pay') != -1 || topath.indexOf('/center') != -1) {
            next('/login')
        } else {
            next()
        }
    }
})
export default router;