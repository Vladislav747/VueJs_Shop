<template>
  <div class="productList max-width-block">
    
    <filter-products

      v-bind:products="products"
      v-bind:isLoading="isLoading"
      v-bind:noTasks="noTasks"
      v-on:filter_products="filterResults"
      v-on:clear_results="filterResults"
        
     />
    <!-- Если есть isLoading то ставим Loader -->
    <div v-if="isLoading" class="lds-dual-ring"></div>
    <div v-if="noTasks" class="no-tasks">
      <h3>Товары не найдены</h3>Нажмите вверху на панели Добавить Новый Товар
    </div>

    <div v-else class="products">
      <product-card v-for="product in filteredProducts" :key="product._id" :product="product"/>
    </div>
  </div>  
</template>

<script>
import { showNoty } from "../utility";
import ProductCard from "./ProductCard.vue";
import FilterProducts from "./FilterProducts.vue";
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
  name: "ProductList",

  components: {
    ProductCard,
    FilterProducts
  },

  data() {
    return {
      isLoading: false
    };
  },

  computed: {
    noTasks() {
      return (
        this.isLoading === false && (this.tasks && this.tasks.length === 0)
      );
    },

    filteredProducts() {
      return this.$store.state.products
    },
    ...mapGetters({
        productInStock:'productInStock',
      }),
  },

  mounted() {
    //this.getProducts();
  },

  created(){
    this.isLoading = true;
    this.fetchProducts().then(() => this.isLoading = false).catch((error) => {showNoty("Ошибка вывода списка товаров  " + error);});
  },

  methods: {
    /**
     * Получить задачи
     */
    async getProducts() {
      try {
        const response = await this.$http.get("products");
        this.products = response.data;
        this.$emit("remove", this.products);
        this.$emit("get-products", this.products);
        //Создается копия массива
        this.filteredProducts = this.products.slice();
      } catch (error) {
        showNoty("Ошибка вывода списка товаров  " + error);
      }

      this.$parent.$children[0].products = this.filteredProducts;
      this.isLoading = false;
    },

    async filterResults(data){
      this.filteredProducts = data;
    },

    ...mapActions({
      fetchProducts: 'fetchProducts',
    })

  },

  
};
</script>

<style lang="scss" scoped>

//preloader styles
@import "../scss/preloader.scss";

.productList {
  z-index: 1;

  .products {
    display: flex;
    flex-wrap: wrap;
    padding: 16px 0;
  }

  .no-tasks {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
      0 3px 1px -2px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    text-align: center;
  }

  .loading {
    text-align: center;
  }
}

@media screen and (max-width: 800px) {

  .card:nth-child(3n) {
    margin-right: 1em;
  }

  .card:nth-child(2n) {
    margin-right: 0;
  }
}

@media screen and (max-width: 768px){
   .products{
        justify-content: center;

  }
}

</style>