<template>
  <section class="med">
    <h1>Аптека</h1>
    <ProductList category="med"/>
  </section>
</template>

<script>
import ProductList from '@/components/ProductList'

export default {
  name: 'Med',
  components: {
    ProductList
  }
}
</script>