<template>
  <div class="categories-menu bg-light-green">
    <nav class="max-width-block categories-menu__inner">

      <ul class=menu-group>
        <li>
          <router-link class="menu-item"  to="/meat">Мясо</router-link>
        </li>
        <li>
            <router-link class="menu-item" to="/fish">Рыба</router-link>
        </li>
      </ul>

    </nav>
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

