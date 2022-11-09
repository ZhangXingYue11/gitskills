//当前这个模块 API进行统一的管理
import requests from "./ajax";
import mockRequests from './mockAjax'
//三级联动接口
//axios发请求返回结果Promise对象 如果没有return 默认undefined
//对外暴露一个函数都可以用这个函数
export const reqCategoryList = () => requests({ url: "/product/getBaseCategoryList", method: 'get' });
//获取banner
export const reqGetBannerList = () => mockRequests.get('/banner')
//获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')
//获取search模块数据
export const reqGetSearchInfo = (params) => requests({ url: '/list', method: "post", data: params })
//获取产品详情信息的接口
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: "get" })
// 将产品添加到购物车（或者更新某一个产品个数）
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" })
//获取购物车列表数据接口
export const reqCartList = () => requests({ url: "/cart/cartList", method: "get" })
//删除购物车产品的接口
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" })
//修改商品的选中状态
export const reqUpdateCheckedByid = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" })
//获取验证码
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
//注册
export const reqUserRegiser = (data) => requests({ url: '/user/passport/register', data, method: "post" })
//登录
export const requserLogin = (data) => requests({ url: '/user/passport/login', data, method: 'post' })
//获取用户信息【带着用户的token向服务器要用户信息】
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: "get" })
//退出登录
export const reqLogout = () => requests({ url: "/user/passport/logout", method: 'get' })
//获取用户地址信息
export const reqAddressInfo = () => requests({ url: "/user/userAddress/auth/findUserAddressList", method: "get" })
//获取结算商品清单
export const reqOrderInfo = () => requests({ url: "/order/auth/trade", method: 'get' })
//提交订单
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: "post" })
//获取支付信息
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })
//获取订单支付状态
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: "get" })
