<template>
    <div class="checkout__success">
        <p>Благодарим вам за заказ. Ваш заказ оформлен</p>
        <router-link to="/">
            <button class="shop-cart">Вернуться в каталог</button>
        </router-link>
    </div>
</template>

<script>
import firebase from 'firebase/app';

export default {
    name: "Checkout",

    data() {
        return {
            title: "Авторизация",
            loginTitle: "Логин",
            passwordTitle: "Пароль",
            errors: [],
            login:"",
            password:"",
        };
    },

    computed: {
        
    },

    created(){
        
    },
    

    methods: {

        checkForm(){
            console.log()
        }
    }
}
</script>

<style lang="scss" scoped> 
@import "../scss/components/Checkout.scss";

</style>
