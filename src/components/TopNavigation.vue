<template>
  <div class="header bg-light-green">
    <div class="max-width-block header-inner">
      <router-link 
        id="task-list" 
        :to="{ name: 'product-list' }">
        <img 
          src='../assets/shopify.svg' 
          alt="Логотип" 
          class="top-logo">
        
      </router-link>
      <font-awesome-icon 
        icon="bars" 
        size="2x" 
        class="top-icon bars-menu"
      />

      <router-link 
        id="product-add" 
        :to="{ name: 'product-add' }"
        v-if="isAdmin"
      >
        <span class="top-desktop">Создать товар</span>
        <font-awesome-icon 
          icon="plus-circle" 
          size="2x" 
          class="top-icon"/>
      </router-link>

      <div class="categories">
        <ul class="menu-group">
          <li class="menu-item"><router-link :to="{ name: 'books' }">Книги</router-link></li>
          <li class="menu-item"><router-link :to="{ name: 'clothes' }">Одежда</router-link></li>
          <li class="menu-item"><router-link :to="{ name: 'electronics' }">Электроника</router-link></li>
          <li class="menu-item"><router-link :to="{ name: 'food' }">Еда</router-link></li>
          <li class="menu-item"><router-link :to="{ name: 'med' }">Медтовары</router-link></li>
        </ul>
      </div>

      <div class="spacer"/>

      <input 
          v-if="isHome" 
          class="searchInput" 
          v-model="searchText" 
          type="search" 
          placeholder="Искать товары..."
          />
          <font-awesome-icon 
            icon="search" 
            size="2x" 
            class="top-icon search-icon"
            v-if="isHome" 
          />
    </div>
    
    <div class="icon-wrapper cart-link">
      <router-link 
          id="cart" 
          :to="{ name: 'cart' }">
        <div 
            v-if="hasCartItems" 
            class="cart-link__count">{{cartCount}}</div>
        <font-awesome-icon 
            icon="shopping-cart" 
            size="2x" 
            class="cart-icon"/>
        <span class="top-desktop">Корзина</span>
      </router-link>
    </div>

    <div class="icon-wrapper">
       <div 
        class="profile-container"
         v-if="isLogined">
          <div class="profile-inner">
            <img src="https://tinyfac.es/data/avatars/A7299C8E-CEFC-47D9-939A-3C8CA0EA4D13-200w.jpeg" alt="" class="profile-img">
          </div>
          <span class="top-desktop">Владислав</span>
      </div>
      <div 
        class="loginSection"
        v-else >
        <router-link  
            id="login-form" 
            :to="{ name: 'login-form' }">
          <font-awesome-icon 
              icon="sign-in-alt" 
              size="2x"/>
          <span class="top-desktop">Войти</span>
        </router-link>
      </div>    
    </div>

  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: "TopNavigation",

  data() {
    return {
      searchText: "",
      products: [],
      blackTheme: false,
      cartCount: 0,
      acceptRoutes:[
        "/",
        "/med",
        "/food",
        "/clothes",
        "/electronics",
        "/books",
      ]
    };
  },

  props: [],

  computed: {
    isHome() {
      return this.acceptRoutes.includes(this.$route.path);
    },

    hasCartItems : function(){

      //Проверяем данные либо из VUEX контейнера либо из localStorage
      var localCartItems = localStorage.getItem('totalItems');
      var cartItemsCount = (this.cartItems > 0) ? this.cartItems : localCartItems;
      if(cartItemsCount > 0){
        this.cartCount = cartItemsCount;
      }
      return cartItemsCount > 0
    },

  
    isLogined(){
      var loginedLocal = localStorage.getItem("isLogined");
      if(loginedLocal){
        return loginedLocal == 'true';
      } else{
        return false;
      }
    },

    isAdmin(){
       var adminLocal = localStorage.getItem("isAdmin");
      if(adminLocal){
        return adminLocal == 'true';
      } else{
        return false;
      }
    },
    ...mapState({
      cartItems: state => state.cartItems,

    }),
  },

  methods:{
  
  },

  mounted: function() {
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
@import "../scss/components/CategoriesNavigation.scss";


</style>

