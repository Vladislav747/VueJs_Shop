import Vue from 'vue';
import Router from 'vue-router';

import ProductList from '../components/ProductList.vue';
import ProductAddEdit from '../components/ProductAddEdit.vue';
import ProductDetail from '../components/ProductDetail.vue';
import Cart from '../components/Cart.vue';

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
      path: '/product-edit/:id',
      name: 'product-edit',
      component: ProductAddEdit
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    
  ]
})
