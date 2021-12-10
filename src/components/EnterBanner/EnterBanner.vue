<template>
  <div class="banner-container active" ref="enterBanner">
    <div class="popup">
      <button class="close" @click="closeBanner">
        <span aria-hidden="true">×</span>
      </button>

      <h1>Добро пожаловать на проект Vue Shop</h1>
      <p>Позвольте рассказать что тут есть...</p>
      <ul>
        <li>Во первых справа есть удобный фильтр</li>
        <li>Внизу страницы вы можете поменять тему проекта</li>
        <li>Также вы можете перетаскивать задачи между группами</li>
        <li>А внизу можно добавиь новую задачу</li>
      </ul>
      <p>Спасибо что используете мой проект!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "EnterBanner",
  data() {
    return {
      taskName: "",
      taskDescription: "",
      taskDate: "",
      showForm: false,
    };
  },

  methods: {
    closeBanner() {
      this.$refs.enterBanner.classList.remove("active");
      localStorage.setItem("enterBanner", "true");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./EnterBanner.scss";
</style>
