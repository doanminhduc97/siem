import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import store from '../store'
// import zhHans from '@/locale/zh-Hans.json'
import vi from '@/locale/vi.json'
import en from '@/locale/en.json'
const translation = {
  vi: vi,
  en: en,
}
const i18n = new VueI18n({
  locale: store.getters['app/getLocale'], // set locale
  messages: translation, // set locale messages
})

store.commit('app/SET_TRANSLATION', translation, {root: true})

export default i18n
