import request from '@/util/request'

const state = {
  agents: [],
  loading: false,
  netiface: [],
  ports: [],
  netaddr: [],
  hotfixes: [],
  packages: [],
  processes: [],
}

const getters = {
  loading: (state) => state.loading,
  agents: (state) => state.agents,
  netiface: (state) => state.netiface,
  ports: (state) => state.ports,
  netaddr: (state) => state.netaddr,
  hotfixes: (state) => state.hotfixes,
  packages: (state) => state.packages,
  processes: (state) => state.processes

}
const actions = {
  getListAgents({ commit }) {
    commit('GET_REQUEST')
    // get all agent
    return request.get('/agents').then((agents) => {
      // save list agent to store
      commit('GET_AGENTS_SUCCESS', agents.data.affected_items)
    })
  },
  getListNetiface({ commit }, { id, limit, offset}) {
    commit('GET_REQUEST')
    return request.get(`/syscollector/${id}/netiface`, { limit, offset }).then((netiface) => {
      // save list netiface to store
      commit('GET_NETIFACE_SUCCESS', netiface.data.affected_items)
    })
  },
  getListPorts({ commit }, { id, limit, offset }) {
    commit('GET_REQUEST')
    return request.get(`/syscollector/${id}/ports`, { limit, offset }).then((ports) => {
      // save list ports to store
      commit('GET_PORTS_SUCCESS', ports.data.affected_items)
    })
  },
  getListNetaddr({ commit }, { id, limit, offset }) {
    commit('GET_REQUEST')
    return request.get(`/syscollector/${id}/netaddr`, { limit, offset }).then((netaddr) => {
      // save list netaddr to store
      commit('GET_NETADDR_SUCCESS', netaddr.data.affected_items)
    })
  },
  getListHotfixes({ commit }, { id, limit, offset }) {
    commit('GET_REQUEST')
    return request.get(`/syscollector/${id}/hotfixes`, { limit, offset }).then((hotfixes) => {
      // save list hotfixes to store
      commit('GET_HOTFIXES_SUCCESS', hotfixes.data.affected_items)
    })
  },
  getListPackages({ commit }, { id, limit, offset }) {
    commit('GET_REQUEST')
    return request.get(`/syscollector/${id}/packages`, { limit, offset }).then((packages) => {
      // save list packages to store
      commit('GET_PACKAGES_SUCCESS', packages.data.affected_items)
    })
  },
  getListProcesses({ commit }, { id, limit, offset }) {
    commit('GET_REQUEST')
    return request.get(`/syscollector/${id}/processes`, { limit, offset }).then((processes) => {
      // save list processes to store
      commit('GET_PROCCESSES_SUCCESS', processes.data.affected_items)
    })
  }
}
const mutations = {
  GET_REQUEST(state) {
    state.loading = true
  },
  GET_AGENTS_SUCCESS(state, agents) {
    state.agents = agents
    state.loading = false
  },
  GET_NETIFACE_SUCCESS(state, netiface) {
    state.netiface = netiface
    state.loading = false
  },
  GET_PORTS_SUCCESS(state, ports) {
    state.ports = ports
    state.loading = false
  },
  GET_NETADDR_SUCCESS(state, netaddr) {
    state.netaddr = netaddr
    state.loading = false
  },
  GET_HOTFIXES_SUCCESS(state, hotfixes) {
    state.hotfixes = hotfixes
    state.loading = false
  },
  GET_PACKAGES_SUCCESS(state, packages) {
    state.packages = packages
    state.loading = false
  },
  GET_PROCCESSES_SUCCESS(state, processes) {
    state.processes = processes
    state.loading = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
