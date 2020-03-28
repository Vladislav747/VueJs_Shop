<template>
  <footer class="bg-light-green">
    <div class="max-width-block footer-inner">
      <font-awesome-icon icon="palette" class="footer-icon icon-size-xl" alt="Удалить задачу"/>
      <input type="checkbox" class="theme-switch" id="change_theme" v-model="isBlackTheme" @click="changeTheme()">
      <label for="change_theme"></label>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterNavigation",

  data() {
    return {
      isBlackTheme: false,
    };
  },

  methods:{
    changeTheme() {
     this.isBlackTheme = !this.isBlackTheme;
     var bodyElement = document.body;

      if(this.isBlackTheme){
        bodyElement.classList.toggle("bg-dark");
      } else {
        bodyElement.classList.toggle("bg-dark");
      }
     this.$root.$emit('changeTheme', this.isBlackTheme);
    },
  }
};
</script>

<style lang="scss" scoped>

footer{
  padding: 20px;
}

.footer-icon{
  margin: 0 10px;
  color: color;
}

//Checkbox theme switcher
.theme-switch {
	position: absolute;
	z-index: -1;
	opacity: 0;
	margin: 10px 10px 0 20px;
}

.theme-switch + label {
	position: relative;
	padding: 0 0 0 60px;
	cursor: pointer;
}


.theme-switch + label:before {
	content: '';
	position: absolute;
	top: -4px;
	left: 0;
	width: 50px;
	height: 26px;
	border-radius: 13px;
	background: #CDD1DA;
	box-shadow: inset 0 2px 3px rgba(0,0,0,.2);
	transition: .2s;
}

.theme-switch + label:after {
	content: '';
	position: absolute;
	top: -2px;
	left: 2px;
	width: 22px;
	height: 22px;
	border-radius: 10px;
	background: #FFF;
	box-shadow: 0 2px 5px rgba(0,0,0,.3);
	transition: .2s;
}
.theme-switch:checked + label:before {
	background: #000000;
}
.theme-switch:checked + label:after {
	left: 26px;
}
.theme-switch:focus + label:before {
	box-shadow: inset 0 2px 3px rgba(0,0,0,.2), 0 0 0 3px rgba(255,255,0,.7);
}

@media screen and (max-width: 768px){

}

@media screen and (max-width: 425px) {
  
}

</style>

