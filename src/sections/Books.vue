<template>
  <section class="books">
    <h1>Книги</h1>
    <ProductList category="books"/>
  </section>
</template>

<script>
import ProductList from '@/components/ProductList'

export default {
  name: 'Books',
  components: {
    ProductList
  }
}
</script>