import Vue from 'vue';
import Router from 'vue-router';

import ProductList from '@/components/ProductList.vue';
import ProductAddEdit from '@/components/ProductAddEdit.vue';
import ProductDetail from '@/components/ProductDetail.vue';
import Cart from '@/components/Cart.vue';
import LoginForm from '@/components/LoginForm.vue';
import RegistrationForm from '@/components/RegistrationForm.vue';
import Checkout from '@/components/Checkout.vue';

//Sections
import Books from '@/sections/Books.vue'
import Clothes from '@/sections/Clothes.vue'
import Electronics from '@/sections/Electronics.vue'
import Food from '@/sections/Food.vue'
import Med from '@/sections/Med.vue'

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
    {
      path: '/books',
      name: 'books',
      component: Books
    },
    {
      path: '/electronics',
      name: 'electronics',
      component: Electronics
    },
    {
      path: '/clothes',
      name: 'clothes',
      component: Clothes
    },
    {
      path: '/med',
      name: 'med',
      component: Med
    },
    {
      path: '/food',
      name: 'food',
      component: Food
    },

    
  ]
})
