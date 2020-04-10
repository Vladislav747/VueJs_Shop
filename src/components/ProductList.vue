<template>
  <div class="productList max-width-block">
    

    <!-- v-bind:products="products" -->
    <filter-products
      
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

    

    <div v-else class="products-wrapper">
      <div class="display-quantity">
        <p class="short-label">Выводить на странице:</p>
        <button 
          class="display-quantity__btn bg-light-green" 
          v-for="type in quantityTypes"
          :key="type"
          @change="changeDisplayQuantity(type)"
        >{{ type }}</button>
        
      </div>
      <div  class="products">
        <product-card 
            v-for="product in filteredProducts" 
            :key="product._id" 
            :product="product"/>
      </div>
      <pagination></pagination>
    </div>

    
  </div>  
</template>

<script>
import { showNoty } from "../utility";
import ProductCard from "./ProductCard.vue";
import FilterProducts from "./FilterProducts.vue";
import Pagination from "./Pagination.vue";
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "ProductList",

  components: {
    ProductCard,
    FilterProducts,
    Pagination,
  },

  data() {
    return {
      isLoading: false,
      quantityTypes: [3, 6, 9],
    };
  },

  computed: {
    noTasks() {
      return (
        this.isLoading === false && (this.tasks && this.tasks.length === 0)
      );
    },

    filteredProducts() {
      return this.$store.state.currentListProducts
    },
    ...mapGetters({
      productInStock: 'productInStock',
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
      changeDisplayQuantity: 'changeDisplayQuantity',
    })

  },

  
};
</script>

<style lang="scss" scoped>

//preloader styles
@import "../scss/preloader.scss";
@import "../scss/components/ProductList.scss";

</style>