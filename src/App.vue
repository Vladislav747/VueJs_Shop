<template>
  <div id="app">
    <div id="main-wrapper">
      <div class="left-panel">
        <vertical-menu />
      </div>
      <div class="right-panel">
        <top-navigation
        @search="updateSearch"
        @get-products="get-products"
        />
        <mobile-menu />
        <div class="content-wrapper">
          <router-view :search="searchText" />
        </div>
      </div>
      
    </div>

    
 
    <footer-navigation />
  
  </div>
</template>

<script>
import TopNavigation from '@/components/TopNavigation/TopNavigation.vue';
import FooterNavigation from '@/components/FooterNavigation/FooterNavigation.vue';
import VerticalMenu from '@/components/VerticalMenu/VerticalMenu.vue';
import MobileMenu from '@/components/MobileMenu/MobileMenu.vue';

export default {
  
  name: 'App',
  components: {
    TopNavigation,
    FooterNavigation,
    VerticalMenu,
    MobileMenu,
  },
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    updateSearch (text) {
      this.searchText = text
    },
    
  }
}
</script>

<style lang="scss">
  @import '../node_modules/noty/lib/noty.css';
  @import '../node_modules/noty/lib/themes/mint.css';
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  @import '@/scss/style.scss';
</style>