<template>
  <footer class="bg-light-green">
    <div class="max-width-block footer__inner">
      <div class="footer__left-part">
        <font-awesome-icon
          icon="palette"
          class="footer-icon icon-size-xl"
          alt="Сменить тему"
        />
        <input
          type="checkbox"
          class="theme-switch"
          id="change_theme"
          @click="changeTheme()"
        />
        <label for="change_theme"></label>
      </div>
      <div class="footer__right-part">
        <div class="footer__icons">
          <div class="icon github">
            <div class="tooltip">Github</div>
            <span>
              <img
                src="@/assets/github.svg"
                alt="github-icon"
                class="footer__svg"
              />
            </span>
          </div>
          <div class="icon instagram">
            <div class="tooltip">Instagram</div>
            <span>
              <img
                src="@/assets/instagram.svg"
                alt="instagram-icon"
                class="footer__svg"
              />
            </span>
          </div>
          <div class="icon youtube">
            <div class="tooltip">Youtube</div>
            <span
              ><img
                src="@/assets/youtube.svg"
                alt="youtube-icon"
                class="footer__svg"
              />
            </span>
          </div>
          <div class="icon facebook">
            <div class="tooltip">Facebook</div>
            <span>
              <img
                src="@/assets/facebook.svg"
                alt="facebook-icon"
                class="footer__svg"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterNavigation",

  methods: {
    changeTheme() {
      this.isBlackTheme = !this.isBlackTheme;
      let bodyElement = document.body;

      if (this.isBlackTheme) {
        bodyElement.classList.toggle("bg-dark");
      } else {
        bodyElement.classList.toggle("bg-dark");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./FooterNavigation.scss";
</style>
