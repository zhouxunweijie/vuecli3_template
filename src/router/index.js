import Vue from 'vue'
import Router from 'vue-router'

// 按模块管理引用路由
import tabbar from './tabbar'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/404',
      name: 'nofind',
      component: () => import('@/views/common/404')
    },
    {
      path: '/',
      component: () => import('@/views'),
      redirect: '/home',
      children: [...tabbar]
    },
    // {
    //   path: '/',
    //   component: () => import('@/views/home'),
    //   redirect: '/home',
    //   children: [...tabbar]
    // }
  ]
})
