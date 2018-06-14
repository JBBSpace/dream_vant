/*
 * @Author: 姬兵兵 
 * @Date: 2018-06-06 10:41:56 
 * @Last Modified by: 姬兵兵
 * @Last Modified time: 2018-06-14 17:03:01
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import { Button, Tab, Tabs, Field, Checkbox, CheckboxGroup, Cell, CellGroup,List,Collapse, CollapseItem,PullRefresh,Toast,Dialog,Panel} from 'vant';

Vue.use(Button);
Vue.use(Tab).use(Tabs);
Vue.use(Field);
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(Cell).use(CellGroup);
Vue.use(List);
Vue.use(Collapse).use(CollapseItem);
Vue.use(PullRefresh);
Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Panel);

import App from './App'
import router from './router'
import 'lib-flexible/flexible.js'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
