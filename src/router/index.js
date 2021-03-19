import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)


import login from '../pages/login/login'
import index from '../pages//index/index'
import home from '../pages/home/home'
import menu from '../pages/menu/menu'
import role from '../pages/role/role'
import manager from '../pages/manager/manager'
import cate from '../pages/cate/cate'
import spec from '../pages/speci/spec'
import goods from '../pages/goods/goods'
import vip from '../pages/vip/vip'
import banner from '../pages/banner/banner'
import seckill from '../pages/second/second'
 
export default new Router({
  routes: [
    {
      path:'/login',
      component:login
    },
    
    {
      path:'/',
      component:index,
      children:[
        {
          path:'/',
          component:home,
          name:'首页'
        },
        {
          path:'menu',
          component:menu,
          name:'菜单管理'
        },
        {
          path:'role',
          component:role,
          name:'角色管理'
        },
        {
          path:'manager',
          component:manager,
          name:'管理员管理'
        },
        {
          path:'cate',
          component:cate,
          name:'商品分类'
        },
        {
          path:'spec',
          component:spec,
          name:'商品规格'
        },
        {
          path:'goods',
          component:goods,
          name:'商品管理'
        },
        {
          path:'vip',
          component:vip,
          name:'会员管理'
        },
        {
          path:'banner',
          component:banner,
          name:'轮播图管理'
        },
        {
          path:'seckill',
          component:seckill,
          name:'轮播图管理'
        }
      ]
    },
    {
      path:'*',
      redirect:'/login'
    },
    
  ]
})
