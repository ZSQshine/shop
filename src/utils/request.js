import axios from 'axios'
import qs from 'qs'
import {errorAlert} from './alter'

// 设置请求头
axios.interceptors.request.use(config=>{
    console.group('本次请求路径为:'+config.url)
    if(config.url !== baseUrl+'/api/userlogin'){
      // 需要设置请求头
      config.headers.authorization = JSON.parse(localStorage.getItem('user')).token
    // console.log(JSON.parse(localStorage.getItem('user')).token)
    }
    // console.log(config);
    console.groupEnd();
    return config
  })

// 设置一个响应拦截
axios.interceptors.response.use(res => {
    console.group('本次响应路径为:'+res.config.url)
    if(res.data.code !== 200){
        errorAlert(res.data.msg);
        return
    }
    console.log(res);
    console.groupEnd();
    return res;
})

const baseUrl = '/api';

// 添加菜单
export const addMenu =(data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/menuadd',
        data:qs.stringify(data),
    })
}

// 获取菜单列表

export const getMenu = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/menulist',
        params
    })
}

// 获取一条菜单

export const getOneMenu = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/menuinfo',
        params,
    })
}

// 编辑菜单

export const editMenu = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/menuedit',
        data:qs.stringify(data)
    })
}

// 删除菜单

export const delMenu = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/menudelete',
        data:qs.stringify(data)
    })
}

// 添加角色

export const addRole = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/roleadd',
        data:qs.stringify(data)
    })
}

// 角色列表
export const getRole = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/rolelist',
        params
    })
}

// 角色详情
export const getOneRole = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/roleinfo',
        params,
    })
}
// 编辑角色
export const editRole = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/roleedit',
        data:qs.stringify(data)
    })
}

// 删除角色
export const delRole = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/roledelete',
        data:qs.stringify(data)
    })
}

// 添加管理员
export const addManager = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/useradd',
        data:qs.stringify(data)
    })
}

// 请求管理员总数
export const managerCount = ()=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/usercount',
    })
}

// 管理员列表（分页）
export const managerList = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/userlist',
        params
    })
}
// 管理员信息
export const oneManager = (params)=>{
    return axios({
        method:'get',
        url:baseUrl+'/api/userinfo',
        params
    })
}

// 编辑管理员
export const editManager = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/useredit',
        data:qs.stringify(data)
    })
}

// 删除管路员
export const delManager = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/userdelete',
        data:qs.stringify(data)
    })
}

// 用户登录
export const userLogin = (data)=>{
    return axios({
        method:'post',
        url:baseUrl+'/api/userlogin',
        data:qs.stringify(data)
    })
}

// 添加分类
export const addCate = (data)=>{
    // 使用formData来处理文件上传
    let form = new FormData();
    for(let i in data){
        form.append(i,data[i]);
    }
    return axios({
        method:'post',
        url:baseUrl + '/api/cateadd',
        data:form
    })
}

// 请求分类列表
export const getCate = (params)=>{
    return axios({
        method:'get',
        url:baseUrl + '/api/catelist',
        params

    })
}

// 获取
export const oneCate = (params)=>{
    return axios({
        method:'get',
        url:baseUrl + '/api/cateinfo',
        params

    })
}

// 编辑
export const editCate = (data)=>{
    let form = new FormData();
    for(let i in data){
        form.append(i,data[i]);
    }
    return axios({
        method:'post',
        url:baseUrl + '/api/cateedit',
        data:form

    })
}

// 删除分类列表
export const delCate = (data)=>{
    return axios({
        method:'post',
        url:baseUrl + '/api/catedelete',
        data:qs.stringify(data)

    })
}

// 添加规格
export const addSpec = (data)=>{
    return axios({
        method:'post',
        url:baseUrl + '/api/specsadd',
        data:qs.stringify(data)

    })
}
// 获取总数
export const specCount = ()=>{
    return axios({
        method:'get',
        url:baseUrl + '/api/specscount',
      

    })
}

// 商品规格列表
export const specList = (params)=>{
    return axios({
        method:'get',
        url:baseUrl + '/api/specslist',
        params
    })
}

// 
export const oneSpec = (params)=>{
    return axios({
        method:'get',
        url:baseUrl + '/api/specsinfo',
        params
    })
}

// 修改
export const editSpec = (data)=>{
    return axios({
        method:'post',
        url:baseUrl + '/api/specsedit',
        data:qs.stringify(data)

    })
}
// 删除
export const delSpec = (data)=>{
    return axios({
        method:'post',
        url:baseUrl + '/api/specsdelete',
        data:qs.stringify(data)

    })
}
// 添加商品
export const addGoods = (data)=>{
    let form = new FormData();
    for (let i in data){
        form.append(i,data[i]);
    }
    return axios({
        method:'post',
        url:baseUrl + '/api/goodsadd',
        data:form,

    })
}
// 商品列表
export const goodsList = (params)=>{
    return axios({
        method:'get',
        url:baseUrl + '/api/goodslist',
        params
    })
}
export const goodsCount = ()=>{
    return axios({
        method:'get',
        url:baseUrl + '/api/goodscount',
    })
}
// 
export const onegoods = (params)=>{
    return axios({
        method:'get',
        url:baseUrl + '/api/goodsinfo',
        params
    })
}

// 修改
export const editGoods = (data)=>{
    let form = new FormData();
    for (let i in data){
        form.append(i,data[i]);
    }
    return axios({
        method:'post',
        url:baseUrl + '/api/goodsedit',
        data:form

    })
}
// 删除
export const delGoods = (data)=>{
    return axios({
        method:'post',
        url:baseUrl + '/api/goodsdelete',
        data:qs.stringify(data)

    })
}

// 获取会员列表
export const getVip = ()=>{
    return axios({
        method:'get',
        url:baseUrl + '/api/memberlist',
        
    })
}

// 获取一条
export const oneVip = (params)=>{
    return axios({
        method:'get',
        url:baseUrl + '/api/memberinfo',
        params
    })
}
// 编辑会员

export const editVip = (data)=>{
    return axios({
        method:'post',
        url:baseUrl + '/api/memberedit',
        data:qs.stringify(data)

    })
}

// 添加轮播图
export const addBanner = (data)=>{
    let form = new FormData();
    for(let i in data){
        form.append(i,data[i])
    }
    return axios({
        method:'post',
        url:baseUrl + '/api/banneradd',
        data:form

    })
}

// 轮播图列表
export const getBanner = ()=>{
    return axios({
        method:'get',
        url:baseUrl + '/api/bannerlist',
        
    })
}

// 轮播图详情
export const oneBanner = (params)=>{
    return axios({
        method:'get',
        url:baseUrl + '/api/bannerinfo',
        params
    })
}

// 编辑轮播图
export const editBanner = (data)=>{
    let form = new FormData();
    for(let i in data){
        form.append(i,data[i])
    }
    return axios({
        method:'post',
        url:baseUrl + '/api/banneredit',
        data:form

    })
}

// 删除
export const delBanner = (data)=>{
    return axios({
        method:'post',
        url:baseUrl + '/api/bannerdelete',
        data:qs.stringify(data)

    })
}

// 添加活动
export const addSecond = (data)=>{
    // let form = new FormData();
    // for(let i in data){
    //     form.append(i,data[i])
    // }
    return axios({
        method:'post',
        url:baseUrl + '/api/seckadd',
        data:qs.stringify(data)

    })
}

// 活动列表
export const getSecond = ()=>{
    return axios({
        methods:'get',
        url:baseUrl + '/api/secklist',
    })
}
// 获取一条
export const oneSecond = (params)=>{
    return axios({
        methods:'get',
        url:baseUrl + '/api/seckinfo',
        params
    })
}
// 编辑
export const editSecond = (data)=>{
    return axios({
        method:'post',
        url:baseUrl + '/api/seckedit',
        data:qs.stringify(data)

    })
}

// 删除活动
export const delSecond = (data)=>{
    return axios({
        method:'post',
        url:baseUrl + '/api/seckdelete',
        data:qs.stringify(data)

    })
}