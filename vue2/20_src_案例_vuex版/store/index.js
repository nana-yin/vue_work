import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 用于i存储数据
const state = {
  sum: 0,
  school: '尚硅谷',
  subject: '前端'
}

// 用于相应组件中的动作
const actions = {
  // jia(context, value) {
  //   context.commit('JIA', value)
  // },
  // jian(context, value) {
  //   context.commit('JIAN', value)
  // },
  oddJia(context, value) {
    if (context.state.sum % 2) {
      context.commit('JIA', value)
    }
  },
  waitJia(context, value) {
    setTimeout(() => {
      context.commit('JIA', value)
    }, 500)
  },
}

// 为了操作数据state
const mutations = {
  JIA(state, value) {
    state.sum += value
  },
  JIAN(state, value) {
    state.sum -= value
    console.log('---value',state, value)
  }
}

// 用于将state中的值进行加工
const getters = {
  bigSum(state) {
    return state.sum * 10
  }
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
