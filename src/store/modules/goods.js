import {goodsList,goodsCount} from '../../utils/request'
const state = {
    goodsList: [],
    // 每页条数
    size: 3,
    // 当前页码
    page: 1,
    // 数据总条数
    total: 0
}

const mutations = {
    changeGoodsList(state, arr) {
        state.goodsList = arr;
    },
    // 总数
    changeTotal(state, num) {
        state.total = num;
    },
    // 当前页
    changePage(state, page) {
        state.page = page;
    }

}

const actions = {
    // 请求获取用户列表
    goodsListActions(context) {
        // 声明要传递的参数
        var param = {
            size: context.state.size,
            page: context.state.page,
        }
        // 发起请求
        goodsList(param).then(res => {
            // 判断返回列表的数据是否为空.如果为空,将page-1,如果不为空则直接获取列表数据
            if ((res.data.list == null || res.data.list.length == 0) && context.state.page > 1) {
                // 将page-1
                context.commit('changePage',context.state.page - 1);
                // 自调,获取列表
                context.dispatch('goodsListActions');
                return;
            }
            context.commit('changeGoodsList', res.data.list);
        })
    },
    // 请求获取数据总数
    totalActions(context) {
        goodsCount().then(res => {
            context.commit('changeTotal', res.data.list[0].total);
        })
    },
    // 获取当前页数据
    pageActions(context, page) {
        // context.state.page = page;
        context.commit('changePage', page);
    },
    // 获取全部的数据
    allActions(context){
        goodsList().then(res=>{
            context.commit('changeGoodsList',res.data.list)
        })
    }

}

const getters = {
    goodsList(state) {
        return state.goodsList;
    },
    total(state) {
        return state.total;
    }
}

export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true,
}