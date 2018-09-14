// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.base.css'
import 'vue-ydui/dist/ydui.rem.css'



import jsonp from 'jsonp'
import qs from 'qs'
import $ from 'jquery'


Vue.prototype.jsonp = jsonp 
Vue.prototype.qs = qs


Vue.use(YDUI)

Vue.config.productionTip = false

// 配置路由全局前置钩子函数
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
      window.document.title = to.meta.title
    }
  next()
})
// 配置路由全局后置钩子函数
let routerTimer = null                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
router.afterEach((to, from) => {
  clearTimeout(routerTimer)
  window.scrollTo(0, 0)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
