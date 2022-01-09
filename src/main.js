import Vue from 'vue'
import router from './router/'
import store from './store/'
import './registerServiceWorker'
import './plugins/vuetify'
import './theme/default.sass'

import App from './App.vue'
import vuetify from './plugins/vuetify'
import i18n from './plugins/i18n'
import '@mdi/font/css/materialdesignicons.css'
import 'jodit/build/jodit.css'
import VueApexCharts from 'vue-apexcharts'
import excel from 'vue-excel-export'
 
Vue.use(excel)
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)
Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
})
app.$mount('#app')
 