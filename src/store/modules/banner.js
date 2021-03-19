import {getBanner} from '../../utils/request'
const state = {
  bannerList:[],//初始化数据
}

// 操作数据
const mutations = {
  changeBannerList(state,arr){
    state.bannerList = arr
  }
}

const actions = {
  bannerListActions(context){
    // 发起菜单列表请求
    getBanner().then(res=>{
      context.commit('changeBannerList',res.data.list);
    })
  }
}

const getters = {
  bannerList(state){
    return state.bannerList
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced:true,
}
