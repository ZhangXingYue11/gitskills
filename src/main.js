import Vue from 'vue'
import App from './App.vue'
// 三级联动组件 注册为全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from "@/components/Pagination"
//按需引入element-ui组件
import { MessageBox } from 'element-ui'
//第一个参数：全局组件的名字 第二个参数 哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
//注册全局组件
//注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert
//引入路由
import router from "@/router"
//引入仓库
import store from '@/store'
Vue.config.productionTip = false

//引入mockServe文件,让咱们模拟接口跑起来
import "@/mock/mockServe.js";
//引入swiper 的样式
import 'swiper/swiper-bundle.min.css'


//统一接受api文件夹里面全部请求函数
import * as API from '@/api'
//引入插件（图片懒加载）
import VueLazyload from 'vue-lazyload'
//引入懒加载图片
import pic from '@/assets/1.jpg'
// 注册插件
Vue.use(VueLazyload, {
  //懒加载默认图片
  loading: pic
})
new Vue({
  render: h => h(App),
  //全局事件总线配置
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  //注册路由
  router,
  //注册仓库
  store
}).$mount('#app')
