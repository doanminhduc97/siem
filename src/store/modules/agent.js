import request from '@/util/request'

const state = {
  agents: [],
  loading: false,
}

const getters = {
  loading: (state) => state.loading,
  agents: (state) => state.agents,
}
const actions = {
  getListAgents({ commit }) {
    commit('GET_AGENTS_REQUEST')
    // get all agent
    return request.get('/agents').then((agent) => {
      // save list agent to store
      console.log(agent)
      commit('GET_AGENTS_SUCCESS', agent.data.affected_items)
    })
  },
}
const mutations = {
  GET_AGENTS_REQUEST(state) {
    state.loading = true
  },
  GET_AGENTS_SUCCESS(state, agents) {
    state.agents = agents
    state.loading = false
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
