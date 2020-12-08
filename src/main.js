import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/fontawesome'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import { jsPDF } from "jspdf";
import 'jspdf-autotable';

Vue.config.productionTip = false
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(jsPDF)
Vue.prototype.$http = axios;
Vue.prototype.$api = 'https://api.froster.tugasbesar.com';

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
