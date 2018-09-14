import Vue from 'vue'
import Router from 'vue-router'

const HelloWorld = () =>
  import ('@/components/HelloWorld')

//首页
const list = () =>
  import ('@/components/list')

//手机验证
const phone = () =>
  import ('@/components/phone')

//学习页面
const study = () =>
  import ('@/components/study')

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        title: '测试'
      }
    },
    {
      path: '/list',
      name: 'list',
      component: list,
      meta: {
        title: '教学百篇案例'
      }
    },
    {
      path: '/phone',
      name: 'phone',
      component: phone,
      meta: {
        title: '手机号验证'
      }
    },
    {
      path: '/study',
      name: 'study',
      component: study,
      meta: {
        title: '学习页面'
      }
    },
  ]
})
