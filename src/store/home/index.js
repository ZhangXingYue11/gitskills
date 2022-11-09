//home模块的小仓库
//引入封装的接口函数
import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api/index"
const state = {
    //state中的数据默认初始值不能乱写，服务器返回的是数组就是数组
    categoryList: [],
    //轮播图的数据
    bannerList: [],
    floorList: []
}
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList
    }
}
const actions = {
    getCategoryList({ commit }) {
        let result = reqCategoryList()
        result.then((res) => {
            if (res.code == 200) {
                commit("CATEGORYLIST", res.data)
            }
        })
    },
    //获取首页轮播图的数据
    getBannerList({ commit }) {
        let result = reqGetBannerList()
        result.then((res) => {
            if (res.code == 200) {
                commit("GETBANNERLIST", res.data)
            }
        })
    },
    //获取floor数据
    getFloorList({ commit }) {
        let result = reqFloorList()
        result.then((res) => {
            if (res.code == 200) {
                commit("GETFLOORLIST", res.data)
            }
        })
    }

}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}