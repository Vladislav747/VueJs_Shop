import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'


Vue.use(Vuex)

export default new Vuex.Store({
  state : {
    products:[],
    totalProducts: 0,
    cart:[],
    cartItems:0,
    checkoutStatus: null,
    highprice: 1500,
    sale: false,
    currency: "руб",
    displayQuantity: 3,
    currentPage: 1,
    totalPages: "",
    currentListProducts: [],
    comments:[],
  },
  getters,
  actions,
  mutations
})