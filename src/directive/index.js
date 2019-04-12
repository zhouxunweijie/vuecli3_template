import Vue from 'vue'

import back from './back'

let keys = Object.keys(back)

keys.forEach((item, index) => {
  Vue.directive(item, back[item])
})