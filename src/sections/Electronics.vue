<template>
  <section class="electronics">
    <h1>Электроника</h1>
    <ProductList category="electronics"/>
  </section>
</template>

<script>
import ProductList from '@/components/ProductList'

export default {
  name: 'Electronics',
  components: {
    ProductList
  }
}
</script>