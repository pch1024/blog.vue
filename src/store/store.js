import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    isAuth: !!window.localStorage.getItem('token'),
    asideShow: !!window.localStorage.getItem('token')
  },
  getters: {
    getAuth: state => {
      return state.isAuth
    },
    asideShow: state => {
      return state.asideShow
    }
  },
  mutations: {
    changeAuth (state, msg) {
      // console.log(msg)
      state.isAuth = !!window.localStorage.getItem('token')
      state.asideShow = !!window.localStorage.getItem('token')
    },
    changeAsideShow (state, bool) {
      state.asideShow = bool
    }
  },
  actions: {
    changeAsideShow (context, bool) {
      context.commit('changeAsideShow', bool)
    },
    changeAuthAsync (context, msg) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          context.commit('changeAuth', msg)
          resolve('changeAuthAsync ok')
        }, 0)
      })
    }
  }
})
