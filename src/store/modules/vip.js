import {getVip} from '../../utils/request'
const state = {
  vipList:[],//初始化数据
}

// 操作数据
const mutations = {
  changeVipList(state,arr){
    state.vipList = arr
  }
}

const actions = {
  vipListActions(context){
    // 发起菜单列表请求
    getVip().then(res=>{
      context.commit('changeVipList',res.data.list);
    })
  }
}

const getters = {
  vipList(state){
    return state.vipList
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced:true,
}
