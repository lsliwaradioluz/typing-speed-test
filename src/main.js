import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import { store } from './store/store.js';

Vue.use(VueResource);
Vue.http.options.root = 'https://speedtest-results-8b891.firebaseio.com/results.json';

new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
