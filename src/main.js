import Vue from 'vue'
import App from './App.vue'
import store from './store'

import KeenUI from 'keen-ui';
import 'keen-ui/dist/keen-ui.css';
Vue.use(KeenUI);

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
