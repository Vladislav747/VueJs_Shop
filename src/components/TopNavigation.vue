<template>
  <div class="header bg-light-green">
    <div class="max-width-block header-inner">
      <router-link id="task-list" :to="{ name: 'product-list' }">
        <span class="top-desktop">Главная</span>
        <font-awesome-icon icon="list-ul" size="2x" class="top-icon"/>
      </router-link>

      <router-link id="product-add" :to="{ name: 'product-add' }">
        <span class="top-desktop">Создать</span>
        <font-awesome-icon icon="plus-circle" size="2x" class="top-icon"/>
      </router-link>

      <div class="spacer"/>

      <input v-if="isHome" class="" v-model="searchText" type="search" placeholder="Искать товары...">
    </div>
    
    <div class="icon-wrapper">
      <router-link id="cart" :to="{ name: 'cart' }">
        <font-awesome-icon icon="shopping-cart" size="2x" class="cart-icon"/>
        <span class="top-desktop">Корзина</span>
      </router-link>
    </div>

    <div class="icon-wrapper">
      <router-link id="login-form" :to="{ name: 'login-form' }">
        <font-awesome-icon icon="sign-in-alt" size="2x"/>
        <span class="top-desktop">Войти</span>
      </router-link>
    </div>

  </div>
</template>

<script>
import { bus } from "../utility/bus.js";

export default {
  name: "TopNavigation",

  data() {
    return {
      searchText: "",
      products: [],
      blackTheme: false,
    };
  },

  props: [],

  computed: {
    isHome() {
      return this.$route.path === "/";
    }
  },

  methods:{
  
  },

  mounted: function() {
    bus.$on("remove", function(products) {
     
      var vm = this;
      vm.products = products;
    });

    this.$root.$on('changeTheme', this.changeTheme);
  },

  watch: {

    /**
     * Поиск задач по имени (name)
     */
    searchText: function() {
      var products = this.products;
      var searchedProducts = [];
      var str = new RegExp(this.searchText);
      products.forEach(element => {
        var found = str.test(element.name);
        if (found) {
          searchedProducts.push(element);
        }
      });

      this.$parent.$children[1].filteredProducts = searchedProducts;
    },
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/components/TopNavigation.scss";



</style>

