import { createStore } from 'vuex'

export default createStore({
  state: {
    sessionId: '' // 当前登录的凭证
  },
  getters: {},
  mutations: {
    // 设置当前登录的凭证
    setSessionId (state, data) {
      state.sessionId = data
    }
  },
  actions: {},
  modules: {}
})
