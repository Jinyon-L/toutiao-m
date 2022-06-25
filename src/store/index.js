import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOKEN_USER'

export default new Vuex.Store({
  state: {
    user: getItem(TOKEN_KEY)
  },
  getters: {},
  mutations: {
    setUser (state, data) {
      state.user = data
      // 备份到本地
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {},
  modules: {}
})
