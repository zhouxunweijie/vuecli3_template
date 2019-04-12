import Vue from 'vue'
import Vuex from 'vuex'

// 引入modules
import common from './common'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common
  }
})
