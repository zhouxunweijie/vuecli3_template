import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// base样式
import '@/assets/less/base.less'

// 适配移动端浏览器大小
import 'lib-flexible/flexible.js'

// 引入自定义指令
import '@/directive'

Vue.config.productionTip = false

// 设置title
// router.beforeEach((to, from, next) => {
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
//   next()
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
