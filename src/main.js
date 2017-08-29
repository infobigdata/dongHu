// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { AlertPlugin, LoadingPlugin, ToastPlugin, dateFormat } from 'vux'

import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import store from './store'
import './assets/js/rem'

Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {

  document.title = to.meta.title ? to.meta.title : '东湖大数据交易中心'
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.userToken) {
      next()
    }else {
      next({ path: '/login', query: { redirect: to.fullPath } })
    }
  }else{
    next()
  }
  next()

})

// 全局注册vux
Vue.use(AlertPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
window.dateFormat = dateFormat;

/* eslint-disable no-new */
new Vue({
  store,
  router
}).$mount('#app')
