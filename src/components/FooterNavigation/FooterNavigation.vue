<template>
  <footer class="bg-light-green">
    <div class="max-width-block footer-inner">
      <font-awesome-icon icon="palette" class="footer-icon icon-size-xl" alt="Сменить тему"/>
      <input type="checkbox" class="theme-switch" id="change_theme" @click="changeTheme()">
      <label for="change_theme"></label>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterNavigation",

  methods:{
    changeTheme() {
     this.isBlackTheme = !this.isBlackTheme;
     var bodyElement = document.body;

      if(this.isBlackTheme){
        bodyElement.classList.toggle("bg-dark");
      } else {
        bodyElement.classList.toggle("bg-dark");
      }

    },
  }
};
</script>

<style lang="scss" scoped>
@import "./FooterNavigation.scss";
</style>

