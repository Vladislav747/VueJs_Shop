<template>
  <div class="categories-menu">
    <nav class="max-width-block categories-menu__inner">

      <ul class=menu-group>
        <li v-for="menu in categoriesList" :key="menu.menu_title">
          <router-link 
            class="menu-item"  
            :to= menu.menu_title>{{menu.menu_title}}</router-link>
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
      categoriesList: [
        {
          menu_title: "Мясо",
          menu_link: "/meat"
        },
        {
          menu_title: "Рыба",
          menu_link: "/fish"
        },
         {
          menu_title: "Подгузники",
          menu_link: "/diapers"
        },
        {
          menu_title: "Одежда",
          menu_link: "/clothes"
        },
        {
          menu_title: "Билеты",
          menu_link: "/tickets"
        },
        {
          menu_title: "Книги",
          menu_link: "/books"
        },
        {
          menu_title: "Электроника",
          menu_link: "/electronics"
        },
        {
          menu_title: "Аптека",
          menu_link: "/med"
        }
      ]
    };
  },

  props: [],

  computed: {
  
  },

  methods:{
  
  },

  mounted: function() {
  
  },

  watch: {

  },


};
</script>

<style lang="scss" scoped>
@import "../scss/components/CategoriesNavigation.scss";



</style>

