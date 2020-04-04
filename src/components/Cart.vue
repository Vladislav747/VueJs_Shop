<template>
   <div class="shopping-cart">
    <!-- <div v-if="$store.state.cart.length <= 0" class="empty-cart"> -->
    <div  class="empty-cart">
      <p>Your cart is currently empty.</p>
      <router-link to="/">
        <button class="shop-cart">Shop Now!</button>
      </router-link>
    </div>
    <div  class="shopping-cart-items">
      <ul>
        <li v-for="product in products" class="cart-product-card" v-bind:key >
          <img :src="require(`@/static/images/${product.img}`)" :alt="`Image of ${product.title}`">
          <span class="product-title">{{product.title}}</span>
          <span class="product-price"> {{product.price | currency}}</span>
          <span class="product-cart-quantity">Quantity: {{product.quantity}}</span>
        </li>
      </ul>
       <!-- <product-card class="cart-product-card" v-for="product in products" :key="product._id" :product="product"/> -->

      <div class="cart-checkout">
        <h3>Cart total : </h3>
        <p>{{ total | currency}}</p>
        <!-- <button :disabled="$store.state.cart.length <= 0" @click="$store.dispatch('checkout')">Checkout</button>
        <p class="status" v-if="$store.state.checkoutStatus">{{$store.state.checkoutStatus}}</p> -->
        <!-- <button :disabled="$store.state.cart.length <= 0" @click="$store.dispatch('checkout')">Checkout</button> -->
        <button class="btn-primary" @click="$store.dispatch('checkout')">Checkout</button>
        <!-- <p class="status" v-if="checkoutStatus">{{checkoutStatus}}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import Noty from "noty";
import { showNoty } from "../utility";
import {mapState, mapGetters, mapActions} from 'vuex'
import ProductCard from "./ProductCard.vue";

export default {
    name: "Cart",

    components: {
      ProductCard
    },

    computed: {
      ...mapGetters({
        products:'getProducts',
    
      }),
      ...mapState({
          checkoutStatus: 'checkoutStatus'
      })
    },

    data() {
      return {
        
      };
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

  .empty-cart {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%,-45%);
}
.empty-cart p {
  margin-bottom: 30px;
}
.shopping-cart-items {
  display: flex;
  flex-direction: row;
}
ul {
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
  flex: 2;
  padding-left: 0;
  justify-content: center;
}
.cart-checkout {
  flex: 1;
  justify-content: center;
}
.cart-checkout p {
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 18px;
}
.cart-product-card {
  display: flex;
  flex-direction: column;
  margin-right: 40px;
  margin-bottom: 40px;
}
.product-price {
  margin-bottom: 5px;
}
img {
  width: 180px;
  height: 240px;
}
@media(max-width: 600px) {
  .shopping-cart-items {
    flex-direction: column;
  }
  .cart-product-card {
    margin-right: 0px;
  }
  ul {
    justify-content: space-around;
  }
  img {
    width: auto;
  }
}
</style>
