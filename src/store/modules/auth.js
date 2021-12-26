import request from '@/util/request'
import colors from 'vuetify/es5/util/colors'
import httpStatusCode from '@/api/httpStatusCode'

const randomColor = () => {
  const temp = Object.keys(colors)
  const key = temp[Math.floor(Math.random() * temp.length)]
  const color = colors[key].base
  return color
}

const state = {
  access_token: null,
  access_token_siem: null,
  expires_in: 3600,
  token_type: 'bearer',
  username: 'admin',
  avatar: null,
  userColor: '#2196f3',
  status: 'online',
}
const getters = {
  getAccessToken: (state) => {
    return state.access_token
  }, 
  getAccessTokenSiem: (state) => {
    return state.access_token_siem
  },
  getAvatar: (state) => state.avatar,

  getUsername: (state) => state.username,
  getUserStatus: (state) => state.status,
}
const actions = {
  // just for demo
  //replace you own login logic
  async demoLogin({ commit }, { username, password }) {
    try {
      if (username === 'admin' && password === 'admin') {
        var token = ''
        var apiuser = Buffer.from('wazuhapi:Admin@123', 'utf8').toString('base64');
        const res = await request.get('/security/user/authenticate', { headers: {
            'Authorization': 'Basic ' + apiuser
          }})
        token = res.data.token
        commit('auth/SET_LOGIN', { access_token: token, expires_in: 0 }, { root: true })
        return httpStatusCode.OK
      }
    } catch (error) {
      console.log(error)
    }
  },
  login({ commit, dispatch }, { username, password }) {
    return request({
      url: '/auth/login',
      method: 'post',
      data: {
        username,
        password,
      },
    }).then((resp) => {
      commit('auth/SET_LOGIN', resp, { root: true })
      dispatch('auth/fetchProfile', '', { root: true })
    })
  },
  register({ commit, dispatch }, data) {
    return request({
      url: '/auth/register',
      method: 'post',
      data: data,
    }).then((resp) => {
      commit('auth/SET_LOGIN', resp, { root: true})
      dispatch('fetchProfile')
      return resp
    })
  },
  logout({ commit, dispatch }) {
    dispatch('chat/closeSocket', '', {root: true})
    commit('app/SET_ACCESS_TOKEN', null, { root: true })
  },
  // get current login user info

  fetchProfile({ commit, dispatch, rootState }) {
    return request({
      url: '/me',
      method: 'get',
    }).then((resp) => {
      commit('auth/SET_LOGIN_PROFILE', resp.data, {root: true})
      return resp
    })
  },
}
const mutations = {
  SET_LOGIN(state, { access_token, expires_in }) {
    state.access_token = access_token
    state.expires_in = expires_in
  },
  SET_ACCESS_TOKEN(state, token) {
    state.access_token = token
  },
  SET_LOGIN_PROFILE(state, payload) {
    state.username = payload.username
    state.avatar = payload.avatar
    state.color = randomColor()
  },
  UPDATE_SELF_STATUS(state, status) {
    state.status = status
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
