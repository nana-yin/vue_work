import { nanoid } from 'nanoid'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const countOptions = {
  namespaced: true,
  state: {
    sum: 0,
    school: '尚硅谷',
    subject: '前端',
  },
  actions: {
    oddJia(context, value) {
      if (context.state.sum % 2) {
        context.commit('JIA', value)
      }
    },
    waitJia(context, value) {
      setTimeout(() => {
        context.commit('JIA', value)
      }, 500)
    }
  },
  mutations: {
    JIA(state, value) {
      state.sum += value
    },
    JIAN(state, value) {
      state.sum -= value
    },
  },
  getters: {
    bigSum(state) {
      return state.sum * 10
    }
  }
}

const personOptions = {
  namespaced: true,
  state: {
    personList: [{
      id: '001',
      name: '张三'
    }]
  },
  actions: {
    addPersonWang(context, value) {
      if (value.slice(0,1) === '王') {
        context.commit('ADD_PERSON_WANG', {
          id: nanoid(),
          name: value
        })
      } else {
        alert('只能添加第一个文字是王的数据！')
      }
    },
    addServerPerson(context,value) {
      context.commit('ADD_PERSON_WANG', {
        id: nanoid(),
        name: value
      })
    }
  },
  mutations: {
    ADD_PERSON(state, value) {
      state.personList.unshift({
        id: nanoid(),
        name: value
      })
    },
    ADD_PERSON_WANG(state, value) {
      state.personList.unshift(value)
    }
  },
  getters: {
    firstName(state) {
      return state.personList[0].name
    }
  }
}

export default new Vuex.Store({
  modules: {
    countModule: countOptions,
    personModule: personOptions,
  }
})
