<template>
   <div class="shopping-cart">
    <!-- <div v-if="$store.state.cart.length <= 0" class="empty-cart"> -->
    <div  class="empty-cart">
      <p>Your cart is currently empty.</p>
      <router-link to="/">
        <button>Shop Now!</button>
      </router-link>
    </div>
    <div  class="shopping-cart-items">
      <!-- <ul>
        <li v-for="product in products" class="cart-product-card">
          <img :src="`./static/images/${product.img}`" :alt="`Image of ${product.title}`">
          <span class="product-title">{{product.title}}</span>
          <span class="product-price"> {{product.price | currency}}</span>
          <span class="product-cart-quantity">Quantity: {{product.quantity}}</span>
        </li>
      </ul> -->
      <div class="cart-checkout">
        <h3>Cart total : </h3>
        <p>{{ total | currency}}</p>
        <!-- <button :disabled="$store.state.cart.length <= 0" @click="$store.dispatch('checkout')">Checkout</button>
        <p class="status" v-if="$store.state.checkoutStatus">{{$store.state.checkoutStatus}}</p> -->
        <!-- <button :disabled="$store.state.cart.length <= 0" @click="$store.dispatch('checkout')">Checkout</button> -->
        <button @click="checkout">Checkout</button>
        <!-- <p class="status" v-if="checkoutStatus">{{checkoutStatus}}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import Noty from "noty";
import { showNoty } from "../utility";

export default {
    name: "Cart",
    props: {
    
    },

  data() {
    return {
      blackTheme: false,
    };
  },

  computed: {
  
},

  methods: {
   
  },

};
</script>

<style lang="scss" scoped> 

</style>
