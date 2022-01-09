import axios from 'axios'
import store from '@/store'
import router from '@/router'
// create axios
axios.defaults.withCredentials = true;
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_SIEM, // api base_url
  timeout: 50000, // timeout,
  headers: { 'Access-Control-Allow-Origin': '*' }, 
})

const err = (error) => {
  const { status, data } = error.response
  const { errors } = data
  let message = []
  for (let field in errors) {
    message.push(errors[field])
  }
  switch (status) {
    case 400:
      store.commit('app/SHOW_SNACKBAR', { text: data.message, color: 'error' }, { root: true })
      break
    case 422:
      store.commit('app/SHOW_SNACKBAR', { text: message, color: 'error' })
      break
    case 401:
      store.commit('app/SHOW_SNACKBAR', { text: data.message, color: 'error' }, { root: true })
      break
    case 403:
      store.commit('app/SHOW_SNACKBAR', { text: message, color: 'error' })
      break
    case 500:
      store.commit('app/SHOW_SNACKBAR', { text: 'server error', color: 'error' }, { root: true })
      break
    default:
      break
  }
  return Promise.reject(error)
}
const arrExceptionPath = ["/security/user/authenticate","/elastic/alerts","/internal/search/es"]
// request interceptor
service.interceptors.request.use((config) => {
  config.headers['Content-Type'] = 'application/json'
  var a
  if (store.getters['auth/getAccessToken'] && !arrExceptionPath.includes(config.url)) {
    // add new token into authorization
    config.headers['Authorization'] = ' Bearer ' + store.getters['auth/getAccessToken']
  }
    
  config.baseURL =process.env.VUE_APP_BASE_SIEM;
  if(arrExceptionPath.includes(config.url) && config.url !== "/security/user/authenticate"){
    config.baseURL = process.env.VUE_APP_BASE_ELASTIC
    // config.headers['wz-token'] = store.getters['auth/getAccessToken']; 
    var apiuser = Buffer.from('hoant:Admin@123', 'utf8').toString('base64');
    config.headers['kbn-xsrf'] = 'true';  
    // config.headers['wz-token'] = 'Bearer ' + store.getters['auth/getAccessToken']
    config.headers['Authorization'] = ' Basic ' +apiuser 

    
  }
  return config
}, err)

// response interceptor

service.interceptors.response.use(({ data, config }) => {
  
  if (['put', 'post', 'delete', 'patch'].includes(config.method) && data.meta) {
    store.commit('SHOW_SNACKBAR', { text: 'success', color: 'success' })
  }
  return data
}, err=>{ 
  const error = err.response;
  if (undefined !== error &&  error.status===401 && error.config && 
    !error.config.__isRetryRequest) {
      store.commit('app/SET_ACCESS_TOKEN', null, { root: true })
     router.push('/auth')
    }
})

export default service
