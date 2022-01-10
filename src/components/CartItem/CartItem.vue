<template>
  <div class="cart-item">
   <div class="cart-item__controls">
     <UICheckbox />
   </div>
    <div class="cart-item__content">
      <div class="cart-item__left">
        <img
          class="cart-item__image"
          loading="lazy"
          :src="`${srcImage}`"
          :alt="`Image of product`"
          :title="`Title of image`"
        />
      </div>
      <div class="cart-item__right">
        <div class="cart-item__title">
          <span>{{ itemTitle }}</span>
        </div>
<!--        <div class="product-top" @click="chooseItem(cart)">-->
<!--          <div class="card-row">-->
<!--                <span class="product-price"-->
<!--                >{{ cart.price }} {{ currency }}</span-->
<!--                >-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="card-row">-->
<!--          <div class="counter-block cart-counter">-->
<!--            <span class="minus" @click="decreaseQuantity(cart)"></span>-->
<!--            <input-->
<!--              type="text"-->
<!--              v-model="cart.quantity"-->
<!--              class="text"-->
<!--              name="quantity"-->
<!--              value="1"-->
<!--              ref="product"-->
<!--            />-->
<!--            <span-->
<!--              class="plus"-->
<!--              @click="increaseQuantity(cart)"-->
<!--              data-max="1000"-->
<!--            ></span>-->
<!--          </div>-->
<!--        </div>-->
        <button
          class="btn-primary element-red-style"
          @click="deleteProductFromCart(cart)"
        >
          Удалить из корзины
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import UICheckbox from "@/UIKit/UICheckbox/UICheckbox";

export default {
  name: "CartItem",

  components: {
    UICheckbox,
  },

  props: {
    srcImage: {
      type: String,
      default: "",
    },
    itemTitle: {
      type: String,
      default: "",
    },
    itemPrice: {
      type: String,
      default: "",
    },
  },

  methods: {
    deleteProductFromCart(cart) {
      this.$emit("delete-product-from-cart", cart);
    },
  }



};
</script>

<style lang="scss" scoped>
@import "CartItem";
</style>
