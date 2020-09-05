<template>
  <div class="productList max-width-block">
    
    <filter-products />
    <!-- Если есть isLoading то ставим Loader -->
    <div v-if="isLoading" class="lds-dual-ring"></div>
    
    <div v-else class="products-wrapper">

      <div class="products-list-controls">
        <div class="display-quantity">
          <div class="display-quantity__title">
            <p>Выводить на странице:</p>
          </div>
          
          <div 
            class="display-quantity__select"
            ref="select"
            v-on:click="showSelectBody"
          >
            <div 
              class="select__header"
              ref="product"
            >
              <span class="select__current">{{quantityDefault}}</span>
              <div class="select__icon">
                <img 
                  src='@/assets/chevron-down.svg' 
                  alt="Иконка вниз" 
                  class="select__logo"
                >
              </div>
              
            </div>
            
            <div 
              class="select__body"
            >
              <div 
                class="select__item"
                 v-for="type in quantityTypes"
                :value="type"
                :key="type"
                @click="displayQuantity($event.target)"
              >{{ type }}</div>
              
            </div>
          </div>
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
import { showNoty } from "@/helpers";
import {FilterProducts, Pagination, ProductCard, SortProducts} from "@/components";
import {mapGetters, mapActions} from 'vuex'

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
      quantityDefault: 3,
    };
  },

  props:{
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
    showSelectBody(){
      this.$refs.select.classList.toggle('is-active');
    },

    displayQuantity(el){
      this.changeDisplayQuantity(el.getAttribute("value"));
      this.quantityDefault = el.getAttribute("value");
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
@import "@/scss/preloader.scss";
@import "./ProductList.scss";

</style>