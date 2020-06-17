<template>
  <div class="header bg-light-green">
    <div class="max-width-block header-inner">

      <a 
        href="#" 
        class="mobile-menu"
        @click.prevent="showMobileMenu">
          <font-awesome-icon
            v-if="isHome"
            icon="bars" 
            size="2x" 
            class="top-icon bars-menu"
          />
        </a>

      <div class="spacer"/>

      <input 
        v-if="isHome" 
        class="searchInput" 
        v-model="searchText" 
        type="search" 
        placeholder="Искать товары..."
      />
      <font-awesome-icon
        v-if="isHome" 
        icon="search" 
        size="2x" 
        class="top-icon search-icon"
        
      />

      <div class="icons-block">

        <div class="icon-wrapper cart-link">
          <router-link 
              title="Корзина"
              id="cart" 
              :to="{ name: 'cart' }">
            <div 
              v-if="hasCartItems" 
              class="cart-link__count">{{cartCount}}
            </div>
            <font-awesome-icon 
              icon="shopping-cart" 
              size="2x" 
              class="cart-icon"/>
          </router-link>
        </div>

        <div class="icon-wrapper">
        <div 
          class="profile-container"
          v-if="isLogined">
          <b-avatar 
            variant="info" 
            :src="require(`@/static/images/avatar.jpeg`)"
            alt="Профиль"
            class="mr-3" 
          />
          <b-button 
            class="btn-logout" 
            variant="primary"
            @click="logout()">Выйти</b-button> 
        </div>
        
        <div 
          class="loginSection"
          v-else >
          <router-link
              title="Войти"
              id="login-form" 
              :to="{ name: 'login-form' }">
            <font-awesome-icon 
              icon="sign-in-alt" 
              size="2x"
            />
          </router-link>
        </div> 
      </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {bus} from '@/utility/bus.js'

export default {
  name: "TopNavigation",

  data() {
    return {
      searchText: "",
      blackTheme: false,
      cartCount: 0,
      acceptRoutes:[
        "/",
      ],
      HideMobileMenu: true,
    };
  },

  methods: {

    showMobileMenu(){
      this.HideMobileMenu = !this.HideMobileMenu;
    },

    logout(){
      localStorage.removeItem("isLogined");
      this.$forceUpdate();
    },

    ...mapActions({
      addFilterProducts: 'addFilterProducts',
      chooseCategory: 'chooseCategory',
    })

  },

  computed: {
    isHome() {
      return this.acceptRoutes.includes(this.$route.path);
    },

    hasCartItems : function(){

      //Проверяем данные либо из VUEX контейнера либо из localStorage
      var localCartItems = localStorage.getItem('totalItems');
      var cartItemsCount = (localCartItems) ? localCartItems : this.cartItems;
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
      products: state => state.products,

    }),
  },

  created(){
    //Ловим событие для шапки и пересчета корзины
    bus.$on('totalItemsChanged', (item)=>{
      this.cartCount = item;
    });
    bus.$on('loginStatusChanged', ()=>{
       this.isLogined();
    }
     
    );
    
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

      bus.$emit("filter_search", searchedProducts);
      this.addFilterProducts(searchedProducts);


    },
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/components/TopNavigation.scss";
@import "../scss/components/CategoriesNavigation.scss";


</style>

