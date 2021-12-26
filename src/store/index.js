import Vue from 'vue'
import Vuex from 'vuex'
import modules from './modules'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  key: 'vma',
  storage: window.localStorage,
  modules: ['app', 'auth', 'chat', 'event', 'file', 'index', 'mail', 'task', 'user', 'agent'],
})

Vue.use(Vuex)

const store = new Vuex.Store({
  modules,
  plugins: [vuexLocal.plugin],
})

export default store
