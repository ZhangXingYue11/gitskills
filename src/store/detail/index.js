//detail模块的小仓库
import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
//封装游客身份模块uuid 生成一个随机字符串（不能再变）
import { getUUID } from "@/utils/uuid_tock"
const state = {
    goodInfo: {},
    //游客临时身份
    uuid_token: getUUID(),
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    },
    ADDORUPDATE(state) { }
};
const actions = {
    //获取产品信息的actions
    getGoodInfo({ commit }, skuid) {
        const result = reqGoodsInfo(skuid)
        result.then((res) => {
            if (res.code == 200) {
                commit("GETGOODINFO", res.data)
            }
        })

    },
    //将产品添加到购物车
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        if (result.code == 200) {
            return 'ok'
        } else {
            //代表加入购物车失败
            return Promise.reject(new Error('faile'))
        }
    }
};
const getters = {
    //路径导航简化的数据
    categoryView(state) {
        // 这里的起始状态是空对象 因此categoryView为undefined
        return state.goodInfo.categoryView || {}
    },
    //简化产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    //产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }

}
export default {
    state,
    mutations,
    actions,
    getters
}