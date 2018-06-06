import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Qurt from '@/views/qurt'
import Echart from '@/views/echart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/qurt/:qrcode',
      name: 'qurt',
      component: Qurt
    }
  ]
})
