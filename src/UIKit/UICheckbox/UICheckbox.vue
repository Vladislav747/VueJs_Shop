<template>
  <label class="checkbox-label">
    <span class="checkbox-label__checkbox">
      <input type="checkbox" class="checkbox-label-input" value=""/>
      <span class="checkbox-label__inner"></span>
    </span>
  </label>
</template>

<script>
export default {
  name: "UICheckbox",
};
</script>

<style lang="scss" scoped>
@import "./UICheckbox.scss";
</style>