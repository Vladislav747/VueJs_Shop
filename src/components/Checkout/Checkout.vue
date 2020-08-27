<template>
    <div class="checkout__success">
        <p>Благодарим вам за заказ. Ваш заказ оформлен</p>
        <router-link to="/">
            <button class="shop-cart">Вернуться в каталог</button>
        </router-link>
    </div>
</template>

<script>

export default {
    name: "Checkout",

    data() {
        return {
        };
    },

    computed: {
        
    },

    created(){
        
    },
    

    methods: {
    }
}
</script>

<style lang="scss" scoped> 
@import "./Checkout.scss";

</style>
