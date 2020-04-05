<template>
   <div class="shopping-cart">
    <div v-if="$store.state.cart.length <= 0"  class="empty-cart">
      <p>Ваша корзина пуста.</p>
      <router-link to="/">
        <button class="shop-cart">Вернуться в каталог</button>
      </router-link>
    </div>

    <div v-else class="shopping-cart-items">
      <table class="cart-product-card">
        <thead>
          <tr>
            <td>Выбрать товар</td>
            <td>Название товара</td>
            <td>Изображение товара</td>
            <td>Цена</td>
            <td>Количество товара</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id" >
            <td>
              <input type="checkbox" class="product-checkbox"></input>
            </td>
            <td>
              <span class="product-title">{{product.title}}</span>
            </td>
            <td>
              <img :src="require(`@/static/images/${product.img}`)" :alt="`Image of ${product.title}`">
            </td>
            <td>
              <span class="product-price">{{product.price}} {{currency}}</span>
            </td>
            <td>
              <!-- <span class="product-cart-quantity">{{product.quantity}}</span> -->
              <div class="counter-block">
                <span class="minus" @click="decreaseQuantity(product)"></span>
                <input type="text" v-model="product.quantity" class="text" name="quantity" value="1" ref="product">
                <span class="plus" @click="increaseQuantity(product)" data-max="1000"></span>
            </div>
            </td>
            <td>
              <button class="btn-primary red-style" @click="deleteProductCart(product)">Удалить из корзины</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="cart-checkout">
        <h3>Сумма корзины : </h3>
        <p>{{ total}}  {{currency}}</p>
        <!-- <button :disabled="$store.state.cart.length <= 0" @click="$store.dispatch('checkout')">Checkout</button>
        <p class="status" v-if="$store.state.checkoutStatus">{{$store.state.checkoutStatus}}</p> -->
        <!-- <button :disabled="$store.state.cart.length <= 0" @click="$store.dispatch('checkout')">Checkout</button> -->
        <button class="btn-primary" @click="$store.dispatch('checkout')">Оформить заказ</button>
      </div>
    </div>
  </div>
</template>

<script>
import Noty from "noty";
import { showNoty } from "../utility";
import {mapState, mapGetters, mapActions} from 'vuex'


export default {
    name: "Cart",

    computed: {
      ...mapGetters({
        products:'cartProducts',
        total:'cartTotal',
        currency: 'cartCurrency',
    
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
      deleteProductFromCart(product) {
        console.log(product, "deleteProductFromCart");
        this.check = new Noty({
          text: "Вы точно хотите удалить товар?",
          type: "alert",
          layout: "topCenter",
          buttons: [
            Noty.button("Да", "danger", () => this.deleteProductCart(), {
              id: "delete-yes"
            }),
            Noty.button("Нет", "", () => this.closeCheck(), { id: "delete-no" })
          ]
        });

        this.check.show();
      },

      /**
     * Закрыть всплывающее окно
     */
    closeCheck() {
      if (!this.check) {
        return;
      }
      //Если есть экземпляр то закрыть окно
      this.check.close();
    },


      increaseQuantity(product){
        product.quantity += 1;
        this.$forceUpdate()
      },

      decreaseQuantity(product){
        if(product.quantity > 1){
          product.quantity -= 1;
        }
        this.$forceUpdate()
      },

      ...mapActions({
        fetchProducts: 'fetchProducts',
        deleteProductCart: 'deleteProductCart',
    })

  },

};
</script>

<style lang="scss" scoped> 
@import "../scss/components/Cart.scss";

</style>
