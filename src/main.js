import Vue from "vue";
import Cookies from 'js-cookie'
import 'normalize.css/normalize.css'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from 'element-ui'
import './icons'
import http from './utils/http'
Vue.config.productionTip = false;

Vue.prototype.$http = http

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
