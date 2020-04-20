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
  },

  data() {
    return {
      isLoading: false,
      quantityTypes: [3, 6, 9],
      filteredItems: [],
      selected: "",
    };
  },

  props:{
    category: "",
  },

  computed: {
    noTasks() {
      return (
        this.isLoading === false && (this.tasks && this.tasks.length === 0)
      );
    },

    filteredProducts() {

        return this.$store.state.currentListProducts;
      

    },
    ...mapGetters({
      productInStock: 'productInStock',
    }),
  },

  created(){
    this.isLoading = true;
    this.fetchProducts().then(() => this.isLoading = false).catch((error) => {showNoty("Ошибка вывода списка товаров  " + error);});
    bus.$on("filter_search", function(elements){
      console.log(elements, "filter_search");
      console.log(this, "filter_search");
        if(elements.length > 0){
          console.log("blya");
          this.filteredItems = elements;
          console.log(this.filteredItems, "blya2");
          this.$forceUpdate();
        }
      
    });
  },

  methods: {
    // /**
    //  * Получить задачи
    //  */
    // async getProducts() {
    //   try {
    //     const response = await this.$http.get("products");
    //     this.products = response.data;
    //     this.$emit("remove", this.products);
    //     this.$emit("get-products", this.products);
    //     //Создается копия массива
    //     this.filteredProducts = this.products.slice();
    //   } catch (error) {
    //     showNoty("Ошибка вывода списка товаров  " + error);
    //   }

    //   this.$parent.$children[0].products = this.filteredProducts;
    //   this.isLoading = false;
    // },

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