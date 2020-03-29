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
       /**
     * Отображение оповещение задачи
     */
    deleteProductFromCart() {
      this.check = new Noty({
        text: "Удаление товара нельзя будет отменить.<br>Вы уверены?",
        type: "alert",
        layout: "topCenter",
        buttons: [
          Noty.button("Да", "danger", () => this.realDelete(), {
            id: "delete-yes"
          }),
          Noty.button("Нет", "", () => this.closeCheck(), { id: "delete-no" })
        ]
      });

      this.check.show();
    },

     /**
     * Удаление задачи
     */
    async realDelete() {
      try {
        await this.$http.delete("products/" + this.product.id);

        this.check.close();
        this.$router.push({ name: "product-list" });

        showNoty("Задача Удалена.", "success");
      } catch (error) {
          this.check.close();
          showNoty(error);
      }
    },

  },

};
</script>

<style lang="scss" scoped> 

</style>
