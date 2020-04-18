<template>
  <section class="food">
    <h1>Еда</h1>
    <ProductList category="food"/>
  </section>
</template>

<script>
import ProductList from '@/components/ProductList'

export default {
  name: 'Food',
  components: {
    ProductList
  }
}
</script>