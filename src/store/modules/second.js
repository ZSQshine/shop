import {getSecond} from '../../utils/request'
const state = {
  secondList:[],//初始化数据
}

// 操作数据
const mutations = {
  changeSecondList(state,arr){
    state.secondList = arr
  }
}

const actions = {
  secondListActions(context){
    // 发起菜单列表请求
    getSecond().then(res=>{
      context.commit('changeSecondList',res.data.list);
    })
  }
}

const getters = {
  secondList(state){
    return state.secondList
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced:true,
}
