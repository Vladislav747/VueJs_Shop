import Vue from 'vue';
import Vuelidate from "vuelidate";
Vue.use(Vuelidate);

import {
  library
} from '@fortawesome/fontawesome-svg-core';
import {
  faPlusCircle,
  faListUl,
  faFilter,
  faEdit,
  faTrash,
  faPalette,
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome';
library.add(faPlusCircle, faListUl, faFilter, faEdit, faTrash, faPalette);
Vue.component('font-awesome-icon', FontAwesomeIcon);

import axios from 'axios';
const clientConfigs = require('./config/clientConfigs');
const api = axios.create({
  baseURL: clientConfigs.baseURLProduction
});
// change base Vue http plugin to axios plugin with our url
Object.defineProperty(Vue.prototype, '$http', {
  get() {
    return api
  }
});

//Set up false turn off  warning about work in production mode when we launch volume.
Vue.config.productionTip = false

import App from './App';
import router from './router';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: {

  },
  router,
  render: h => h(App)
});