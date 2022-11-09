import { reqGetSearchInfo } from '@/api/index'
//search模块的小仓库
const state = {
    searchList: {}
}
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
        console.log(searchList);
    }
}
const actions = {
    //获取search模块数据
    getSearchList({ commit }, params) {
        //params形参是当用户派发action时 第二个参数传过来的 至少是一个空对象
        let result = reqGetSearchInfo(params)
        console.log(result);
        result.then((res) => {
            if (res.code == 200) {
                commit('GETSEARCHLIST', res.data)
            }
        })
    }
}
const getters = {
    goodsList(state) {
        //这样书写是有问题的 当state为空的时候
        return state.searchList.goodsList || []

    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    }

}
export default {
    state,
    mutations,
    actions,
    getters
}