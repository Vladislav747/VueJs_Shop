import Vue from 'vue'
import Router from 'vue-router'

import ProductList from '../components/ProductList.vue'
import ProductAddEdit from '../components/ProductAddEdit.vue'
import ProductDetail from '../components/ProductDetail.vue'

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
      //вызывается с помощью компонента ProductList this.$router.push('task-add')
      path: '/task-add',
      name: 'task-add',
      component: ProductAddEdit
    },
    {
      path: '/task-edit/:id',
      name: 'task-edit',
      component: ProductAddEdit
    }
  ]
})
