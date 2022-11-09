import { reqCartList, reqDeleteCartById, reqUpdateCheckedByid } from "@/api"
const state = {
    cartList: []
}
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList

    }
}
const actions = {
    //获取购物车列表数据
    async getCartList({ commit }) {
        let result = await reqCartList()
        if (result.data) {
            commit("GETCARTLIST", result.data)
        }
    },
    //删除购物车某个产品
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }

    },
    //修改购物车选中产品状态
    async updateCheckedByid({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedByid(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //删除全部选中的产品
    deleteAllCheckedCart({ dispatch, getters }) {
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    },
    //修改全部产品的状态
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        let PromiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedByid', { skuId: item.skuId, isChecked })
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
};
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    }

}
export default {
    state,
    mutations,
    actions,
    getters
}