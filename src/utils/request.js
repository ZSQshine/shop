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
<<<<<<< HEAD
    return axios({
        method:'post',
        url:baseUrl + '/api/goodsadd',
        data:qs.stringify(data)

    })
}
// 商品规格列表
=======
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
>>>>>>> 330bee7... 第二次提交
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
<<<<<<< HEAD
        url:baseUrl + ' /api/goodsinfo',
=======
        url:baseUrl + '/api/goodsinfo',
>>>>>>> 330bee7... 第二次提交
        params
    })
}

// 修改
export const editGoods = (data)=>{
<<<<<<< HEAD
    return axios({
        method:'post',
        url:baseUrl + '/api/goodsedit',
        data:qs.stringify(data)
=======
    let form = new FormData();
    for (let i in data){
        form.append(i,data[i]);
    }
    return axios({
        method:'post',
        url:baseUrl + '/api/goodsedit',
        data:form
>>>>>>> 330bee7... 第二次提交

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