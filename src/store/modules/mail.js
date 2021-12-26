const state = {
  mode: 'light',
  themeColor: 'pink',
}

// getters

const getters = {}

// actions

const actions = {}

// mutations

const mutations = {
  setThemeColor(state, payload) {
    state.themeColor = payload
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
