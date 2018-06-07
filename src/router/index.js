import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Qurt from '@/views/qurt'
import Echart from '@/views/echart'
import Table from '@/views/table'
import List from '@/views/list'

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
    },
    {
      path: '/echart',
      name: 'echart',
      component: Echart
    },
    {
      path: '/table',
      name: 'table',
      component: Table
    },
    {
      path: '/list',
      name: 'list',
      component: List
    }
  ]
})
