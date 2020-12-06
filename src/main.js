import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/fontawesome'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.prototype.$http = axios;
Vue.prototype.$api = 'http://127.0.0.1:8000/api';

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
