<template>
  <div class="productList max-width-block">
    
    <filter-products
     />
    <!-- Если есть isLoading то ставим Loader -->
    <div v-if="isLoading" class="lds-dual-ring"></div>
    
    <div v-else class="products-wrapper">

      <div class="products-list-controls">
        <div class="display-quantity">
          <p>Выводить на странице:</p>
          <select 
            class="display-quantity__btn" 
            @change="changeDisplayQuantity($event.target.value)"
          >
            <option
              v-for="type in quantityTypes"
              :value="type"
              :key="type">{{ type }}
            </option>
          </select>
      </div>
      

      <sort-products />

      </div>
      

      <div  class="products">
        <product-card 
            v-for="product in filteredProducts" 
            :key="product._id" 
            :product="product"/>
      </div>
      <pagination />
    </div>
   
  </div>  
</template>

<script>
import { showNoty } from "@/utility";
import ProductCard from "./ProductCard.vue";
import FilterProducts from "./FilterProducts.vue";
import Pagination from "./Pagination.vue";
import SortProducts from './SortProducts.vue';
import {mapGetters, mapActions} from 'vuex'
import {bus} from '@/utility/bus.js'

export default {

  /* TODO:
  
    Страница товаров. Общая для всех покупателей, на ней по категориям разбиты товары, 
    их можно фильтровать и сортировать по цене, наименованию или производителю и пользовательской оценке. 
    У каждого товара есть название, описание и изображение.
    На странице отображается только фиксированное кол-во товаров, реализована пагинация.
  
  */


  name: "ProductList",

  components: {
    ProductCard,
    FilterProducts,
    Pagination,
    SortProducts,
  },

  data() {
    return {
      quantityTypes: [3, 6, 9],
      filteredItems: [],
      selected: "",
    };
  },

  props:{
    category: "",
  },

  computed: {
    noProducts() {
      return (
        this.filteredProducts.length === 0
      );
    },

    isLoading(){
      return this.filteredProducts.length == 0
      
    },

    filteredProducts() {

        return this.$store.state.currentListProducts;

    },
    ...mapGetters({
      productInStock: 'productInStock',
    }),
  },

  created(){
  
    this.fetchProducts().catch((error) => {showNoty("Ошибка вывода списка товаров  " + error);});

  },

  methods: {

    async filterResults(data){
      console.log(data);
      // this.filteredProducts = data;
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