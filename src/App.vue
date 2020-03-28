<template>
  <div id="main-wrapper">
    <top-navigation
      @search="updateSearch"
      @get-tasks="get-tasks"
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

html {
  box-sizing: border-box;
}

html, body {
  height: 100vh;
}

*,
*:before,
*:after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

* {
  font-family: "Oxygen", sans-serif;
}

.icon-size-m{
  font-size: 1em;
}

.icon-size-xl{
  font-size: 2em;
}

.overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000;
    opacity: 0.3;
}

#main-wrapper {
  color: #333;
  font-size: 1.1rem;
  line-height: 1.6rem;  
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.max-width-block {
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
}

.bg-blue{
  background-color: #2b87d8;
}

.bg-light-green{
  background-color: #e5ede2;
}

.bg-dark{
  background-color: #232323;
}

.bg-grey{
  background-color: #C3C1C0;
}

body.bg-dark{

  #main-wrapper{
    color: white;
  }

  .header.bg-blue{
    background-color: #232323;
  }

  .card{
    background-color: #C3C1C0;
  }

  .task{
    background-color: #C3C1C0;
  }

  footer {
    background-color: #232323;
  }

  .footer-icon{
    color: white;
  }

  .filterIcon {
    background-color: #232323;
  }

  .filterWrapper{
    color: white;
    background-color: #232323;
  }

}



.bg-white{
  background-color: white;
}

.noty_type__alert {
  border: none;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
              0 1px 5px 0 rgba(0, 0, 0, 0.12),
              0 3px 1px -2px rgba(0, 0, 0, 0.2);

  button {
    background-color: #fff;
    border: 1px solid #757575;
    border-radius: 3px;
    cursor: pointer;
    line-height: 1rem;
    margin-right: .5rem;
    padding: 3px 7px;

    &.danger {
      background-color: #de636f;
      border: 1px solid #CA5A65;
      color: #fff;
    }
  }
}

</style>