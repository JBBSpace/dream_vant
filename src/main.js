/*
 * @Author: 姬兵兵 
 * @Date: 2018-06-06 10:41:56 
 * @Last Modified by: 姬兵兵
 * @Last Modified time: 2018-06-06 13:13:12
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import VCharts from 'v-charts'

Vue.use(Vant);
Vue.use(VCharts)
import App from './App'
import router from './router'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
