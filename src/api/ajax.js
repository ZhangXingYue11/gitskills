//对于axios进行二次封装
import axios from "axios";
//引入进度条
import nprogress from "nprogress";
//引入进度条样式
import "nprogress/nprogress.css"
//在当前模块引入store
import store from '@/store'
//利用axios对象的方法create 去创建一个axios实例
// request就是axios 稍微配置了一下
const requests = axios.create({
    //配置对象
    //基础路径 在发送请求时候路径中会出现api
    baseURL: "/api",
    //代表请求超时的时间是5s
    timeout: 5000,
})
//请求拦截器：在发送请求之前 请求拦截器能够监测到 并且可以做一些事情
requests.interceptors.request.use((config) => {
    //config:配置对象 对象里面有一个属性很重要 header请求头
    if (store.state.detail.uuid_token) {
        //请求头添加一个字段：和后台老师商量好了
        config.headers.userTempId = store.state.detail.uuid_token
    }
    //需要携带token给服务器
    if (store.state.user.token) {
        config.headers.token = store.state.user.token
    }
    //进度条开始
    nprogress.start()
    return config
})
//响应拦截器
requests.interceptors.response.use((res) => {
    //这个是成功的回调服务器响应数据回来响应拦截器可以监测到
    //进度条结束
    nprogress.done()
    return res.data
},
    (error) => {
        //响应失败的回调
        return Promise.reject(new Error('faile'));
    })
//对外暴露
export default requests