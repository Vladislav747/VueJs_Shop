import Vue from 'vue';
import Router from 'vue-router';

import {Cart, Checkout, LoginForm, ProductDetail, ProductAddEdit, ProductList, RegistrationForm} from '@/components';


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'product-list',
      component: ProductList
    },
    {
      path: '/product/:id',
      name: 'view-product',
      component: ProductDetail
    },
    {
      //вызывается с помощью компонента ProductList this.$router.push('product-add')
      path: '/product-add',
      name: 'product-add',
      component: ProductAddEdit
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/login-form',
      name: 'login-form',
      component: LoginForm
    },
    {
      path: '/register',
      name: 'register',
      component: RegistrationForm
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: Checkout
    },
  ]
})
