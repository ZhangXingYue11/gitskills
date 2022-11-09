//路由的配置信息
//引入路由组件
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from "@/pages/Detail"
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from "@/pages/Trade"
import Pay from "@/pages/Pay"
import PaySuccess from '@/pages/PaySuccess'
import Center from "@/pages/Center"
//引入二级路由
import MyOrder from "@/pages/Center/myOrder"
import GroupOrder from '@/pages/Center/groupOrder'

/*当打包构建应用的时候 js包会变得非常大 影响页面加载
如果我们能把不同路由对应的组件分割成不同的代码块,然后当路由被访问的时候才对应加载对应的组件 这样就更高效了
*/
export default [
    {
        path: '/center',
        component: Center,
        meta: { show: true },
        name: 'center',
        children: [
            {
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            }, {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]

    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: true },
        name: 'paysuccess'

    },
    {
        path: '/pay',
        component: Pay,
        meta: { show: true },
        name: 'pay',
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }

        }
    },
    {
        path: '/trade',
        component: Trade,
        meta: { show: true },
        name: 'trade',
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path == '/shopcart') {
                next()
            } else {
                next(false)
            }
        }

    },
    {
        path: '/detail/:skuid?',
        component: Detail,
        meta: { show: true },
        name: 'detail'

    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true },
        name: 'shopcart '

    },
    {
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true },
        name: 'addcartsuccess'

    },
    {
        path: '/home',
        component: Home,
        meta: { show: true },
        name: 'home'

    },
    {
        path: '/search/:keyword?',//传递params参数需要占位
        component: Search,
        meta: { show: true },
        name: 'search',

    }, {
        path: '/login',
        component: Login,
        meta: { show: false },
        name: "login"

    }, {
        path: '/register',
        component: Register,
        meta: { show: false },
        name: "register"

    }, {
        path: '*',
        redirect: '/home'
    }
]