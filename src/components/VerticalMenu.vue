<template>
  <div class="vertical-menu">
    <div class="vertical-menu__logo">
      <router-link 
        id="product-list" 
        :to="{ name: 'product-list' }">
        <img 
          src='../assets/shopify.svg' 
          alt="Логотип" 
          class="top-logo"
        >
      </router-link>
    </div>

    <div class="vertical-menu__sub-menu sub-menu bg-light-green">
      <a href="#">
        Главная
      </a>
    </div> 
      
    <div
      v-if="isHome"
      class="categories"
      ref="categoriesMenu">
        <div class="menu-item" v-for="category in categoriesList" :key="category">
          <div class="menu-item__title">
            <a
              href="#"
              @click.prevent="chooseCategory(category)">
              {{category}}
            </a>
          </div>
         
          <div class="sub-categories__wrapper">
            <li class="menu-item__subtitle" v-for="category in subCategoriesList" :key="category">
              <a
                href="#">{{category}}
              </a>
            </li>
          </div>
        </div>


    </div>
  </div>
</template>

<script>



export default {
  name: "VerticalMenu",

  data() {
    return {
      acceptRoutes:[
        "/",
      ],
       categoriesList:[
        "Книги",
        "Одежда",
        "Электроника",
        "Еда",
        "Медтовары"
      ],

      subCategoriesList:[
          "Детские книги",
          "Учебники",
          "Художественные книги",
          "Комиксы и манга"
      
      ],
    };
  },

  methods: {

   
    
  },

  watch: {

  },

  computed: {
    isHome() {
      return this.acceptRoutes.includes(this.$route.path);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/components/VerticalMenu.scss";


</style>

