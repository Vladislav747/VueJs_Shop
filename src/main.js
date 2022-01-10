import Vue from "vue";
import Vuelidate from "vuelidate";

import LogRocket from 'logrocket';

import "./plugins/bootstrap-vue";
import App from "./App";
import router from "./router";
import globalData from "./helpers/globalFunctions";
import store from "@/store/index";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlusCircle,
  faFilter,
  faPalette,
  faShoppingCart,
  faSignInAlt,
  faSearch,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import axios from "axios";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/firestore";

import "semantic-ui-css/semantic.min.css";
import "vue-slider-component/theme/default.css";

Vue.use(Vuelidate);

library.add(
  faPlusCircle,
  faFilter,
  faPalette,
  faShoppingCart,
  faSignInAlt,
  faSearch,
  faBars
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

Object.defineProperty(Vue.prototype, "$http", {
  get() {
    return api;
  },
});

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyCN7IH8XsmkF49HtcN8PA_7FxPx3KNmit0",
  authDomain: "users-napoleon-it.firebaseapp.com",
  databaseURL: "https://users-napoleon-it.firebaseio.com",
  projectId: "users-napoleon-it",
  storageBucket: "users-napoleon-it.appspot.com",
  messagingSenderId: "594737634380",
  appId: "1:594737634380:web:8e05c384009733afcbe8e9",
  measurementId: "G-R4SZ0K0DG1",
};

firebase.initializeApp(firebaseConfig);

LogRocket.init('qnilg7/cams');

new Vue({
  el: "#app",
  data: globalData,
  router,
  render: h => h(App),
  store,
});
