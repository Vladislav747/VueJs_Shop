<template>
  <section class="clothes">
    <h1>Одежда</h1>
    <ProductList category="clothes"/>
  </section>
</template>

<script>
import ProductList from '@/components/ProductList'

export default {
  name: 'Clothes',
  components: {
    ProductList
  }
}
</script>