import Vue from 'vue'
import Router from 'vue-router'
import { publicRoute, protectedRoute } from './config'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const routes = publicRoute.concat(protectedRoute)
import store from '@/store'

Vue.use(Router)
const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes: routes,
})
// router guards
router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = store.getters['auth/getAccessToken']
  if (to.name !== 'login') {
    // check token is exist
    if (token) {
      next()
    } else {
      next({ name: 'login', query: { redirect: to.path } })
    }
  } else {
    next()
  }
  //auth route is authenticated
})

router.afterEach(() => {
  NProgress.done()
})

export default router
