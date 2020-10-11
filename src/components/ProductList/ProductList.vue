<template>
 <div class="product-list max-width-block">
  <enter-banner v-if="!showEnterBanner" />
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
      <div class="select__header" ref="product">
       <span class="select__current">{{ quantityDefault }}</span>
       <div class="select__icon">
        <img
         src="@/assets/chevron-down.svg"
         alt="Иконка вниз"
         class="select__logo"
        />
       </div>
      </div>

      <div class="select__body">
       <div
        class="select__item"
        v-for="type in quantityTypes"
        :value="type"
        :key="type"
        @click="displayQuantity($event.target)"
       >
        {{ type }}
       </div>
      </div>
     </div>
    </div>
    <sort-products />
   </div>

   <div class="products">
    <product-card
     v-for="product in filteredProducts"
     :key="product._id"
     :product="product"
    />
   </div>
   <pagination />
  </div>
 </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import { showNoty } from "@/helpers";

import SortProducts from "@/components/SortProducts/SortProducts.vue";
import Pagination from "@/components/Pagination/Pagination.vue";
import ProductCard from "@/components/ProductCard/ProductCard.vue";
import FilterProducts from "@/components/FilterProducts/FilterProducts.vue";
import EnterBanner from "@/components/EnterBanner/EnterBanner.vue";

export default {
 name: "ProductList",

 components: {
  ProductCard,
  FilterProducts,
  Pagination,
  SortProducts,
  EnterBanner,
 },

 data() {
  return {
   quantityTypes: [3, 6, 9],
   filteredItems: [],
   selected: "",
   quantityDefault: 3,
  };
 },

 computed: {
  noProducts() {
   return this.filteredProducts.length === 0;
  },

  isLoading() {
   return this.filteredProducts.length == 0;
  },

  showEnterBanner() {
   const localStorageBanner = localStorage.getItem("enterBanner");
   return localStorageBanner;
  },

  filteredProducts() {
   return this.$store.state.currentListProducts;
  },
  ...mapGetters({
   productInStock: "productInStock",
  }),
 },

 created() {
  this.fetchProducts().catch((error) => {
   showNoty("Ошибка вывода списка товаров  " + error);
  });
 },

 methods: {
  showSelectBody() {
   this.$refs.select.classList.toggle("is-active");
  },

  displayQuantity(el) {
   this.changeDisplayQuantity(el.getAttribute("value"));
   this.quantityDefault = el.getAttribute("value");
  },

  ...mapActions({
   fetchProducts: "fetchProducts",
   changeDisplayQuantity: "changeDisplayQuantity",
  }),
 },
};
</script>

<style lang="scss" scoped>
//preloader styles
@import "@/scss/preloader.scss";
@import "./ProductList.scss";
</style>
