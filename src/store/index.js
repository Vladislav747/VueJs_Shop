import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import {shop} from '@/api/shop'


Vue.use(Vuex)

export default new Vuex.Store({
  state : {
    products:[   {
      id: 14,
      title: 'Stripe Rag Rug',
      price: 29.99,
      category: 'decor',
      sale: true,
      img: 'bed.jpg',
      inventory: 20
    },
    {
      id: 15,
      title: 'Rosalie Velvet Bed',
      price: 1820.90,
      category: 'furniture',
      sale: false,
      img: 'bed.jpg',
      inventory: 20
    },
    {
      id: 16,
      title: 'Wire Loop Vanity',
      price: 159.00,
      category: 'furniture',
      sale: true,
      img: 'bed.jpg',
      inventory: 20
    }],
    cart:[],
    cartItems:0,
    checkoutStatus: null,
    highprice: 1500,
    sale: false
  },
  getters,
  actions,
  mutations
})