<template>
  <div id="main-wrapper">
    <top-navigation
      @search="updateSearch"
      @get-products="get-products"
      />
    <div class="content-wrapper">
      <router-view :search="searchText"/>
    </div>
    <footer-navigation />
  </div>

</template>

<script>
import TopNavigation from './components/TopNavigation'
import FooterNavigation from './components/FooterNavigation';

export default {
  
  name: 'App',
  components: {
    TopNavigation,
    FooterNavigation,
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