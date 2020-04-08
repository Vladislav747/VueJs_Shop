<template>
  <div class="header__sub bg-light-green">
    <div class="max-width-block header-inner">
      
      <div class="spacer"/>

      <router-link to="/meat">Мясо</router-link>
      <router-link to="/fish">Рыба</router-link>


    </div>
  </div>
</template>

<script>


export default {
  name: "CategoriesNavigation",

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
    },

    hasCartItems : function(){
      console.log(this.cartItems > 0, "CartItems")
      return this.cartItems > 0
    },
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
@import "../scss/components/CategoriesNavigation.scss";



</style>

