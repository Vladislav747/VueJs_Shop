import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import {shop} from '@/api/shop'


Vue.use(Vuex)

export default new Vuex.Store({
  state : {
    products:[],
    cart:[],
    cartItems:0,
    checkoutStatus: null,
    highprice: 1500,
    sale: false,
    currency: "руб/шт",
  },
  getters,
  actions,
  mutations
})