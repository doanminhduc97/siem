import request from '@/util/request'
// import axios from 'axios'
const state = {
  agents: [],
  loading: false,
  netiface: [],
  stats: [],
  rawElastic: {
    index: 'wazuh-alerts-*',
    body: {
      query: {
        bool: {
          must: [],
          filter: [],
          should: [],
          must_not: [],
        },
      },
      aggs: {},
      size: 0,
    },
  },
  netiface: [],
  ports: [],
  netaddr: [],
  hotfixes: [],
  packages: [],
  processes: [],
  hardware: []
}

const getters = {
  loading: (state) => state.loading,
  agents: (state) => state.agents,
  netiface: (state) => state.netiface,
  stats: (state) => state.stats,
  rawElastic: (state) => state.rawElastic,
  netiface: (state) => state.netiface,
  ports: (state) => state.ports,
  netaddr: (state) => state.netaddr,
  hotfixes: (state) => state.hotfixes,
  packages: (state) => state.packages,
  processes: (state) => state.processes,
  os: (state) => state.os,
  hardware: (state) => state.hardware


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
  getListNetiface({ commit }, { id, limit, offset }) {
    commit('GET_REQUEST')
    return request.get(`/syscollector/${id}/netiface`, { limit, offset }).then((netiface) => {
      // save list netiface to store
      commit('GET_NETIFACE_SUCCESS', netiface.data.affected_items)
    })
  },
  getListStats({ commit }, { id }) {
    commit('GET_REQUEST')
    return request.get(`/agents/${id}/stats/logcollector`).then((res) => {
      console.log(res);
      commit('GET_STATS_SUCCESS', res.data.affected_items[0])
      // commit('GET_NETIFACE_SUCCESS', netiface.data.affected_items)
    })
  },
  getInfoStats({ commit }, { id }) {
    commit('GET_REQUEST')
    return request.get(`/agents/${id}/stats/agent`).then((res) => {
      if (!!res) {
        if (!!res.data) {
          if (!!res.data.affected_items[0]) {
            commit('RESPONSE_OK')
            return res.data.affected_items[0];
          }
        }
      }
    })
  },
  getNameOS({ commit }, { id }) {
    commit('GET_REQUEST')
    return request.get(`/agents`,
      {
        params: {
          agents_list: id
        }
      }).then((res) => {
        commit('RESPONSE_OK')
        return res?.data?.affected_items[0]?.name;
      })
  },
  getElastic({ commit }, inputRaw) {
    commit('GET_REQUEST')
    return request.post(`/elastic/alerts`,
      inputRaw
    ).then((res) => {
      commit('RESPONSE_OK')

      return res?.aggregations?.tactics?.buckets
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
  },
  async getHardware({ commit }, id) {
    commit('GET_REQUEST')
    // const apiuser = Buffer.from('ducdm:Admin@123', 'utf8').toString('base64');
    // const basicAuth = 'Basic ' + btoa('ducdm:Admin@123');
    const hardware = await request.get(`/syscollector/${id}/hardware`);
    const os = await request.get(`/syscollector/${id}/os`);
    // save hardware and os to store
    commit('GET_HARDWARE_SUCCESS', [...hardware.data.affected_items, { osInfo: [...os.data.affected_items] }])
  },
  async getAgentStatus() {
    const status = await request.get('/agents/summary/status')
    return status.data
  },
  async getAgentStat({ commit }, params) {
    const agentStat = await request.get('agents/stats/distinct', { params: params })
    return agentStat.data.affected_items;
  },
  async searchChart({ commit }, params) {
    commit('GET_REQUEST')
    const res = await request.post(`/internal/search/es`, params)
    commit('RESPONSE_OK')
    return res;
  }
}
const mutations = {
  GET_REQUEST(state) {
    state.loading = true
  },
  RESPONSE_OK(state) {
    state.loading = false;
  },
  RESPONSE_OK(state) {
    state.loading = false;
  },
  GET_AGENTS_SUCCESS(state, agents) {
    state.agents = agents
    state.loading = false
  },
  GET_NETIFACE_SUCCESS(state, netiface) {
    state.netiface = netiface
    state.loading = false
  },
  GET_STATS_SUCCESS(state, stats) {
    state.stats = stats
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
  },
  GET_HARDWARE_SUCCESS(state, hardware) {
    state.hardware = hardware
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
