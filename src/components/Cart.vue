<template>
   <div class="shopping-cart">
    <div v-if="$store.state.cart.length == 0 && !useStorage"  class="empty-cart">
      <p>Ваша корзина пуста.</p>
      <router-link to="/">
        <button class="shop-cart">Вернуться в каталог</button>
      </router-link>
    </div>

    <div class="shopping-cart-items">
      <table class="cart-product-card">
        <thead>
          <tr>
            <td>Выбрать товар</td>
            <td>Название товара</td>
            <td>Изображение товара</td>
            <td>Цена</td>
            <td>Количество товара</td>
            <td> 
              <button class="btn-primary" @click="deleteAllCart()">Очистить корзину</button>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cart in carts" :key="cart.id" >
            <td>
              <input type="checkbox" class="product-checkbox"></input>
            </td>
            <td>
              <span class="product-title">{{cart.title}}</span>
            </td>
            <td>
              <!-- <img :src="require(`@/static/images/${cart.img}`)" :alt="`Image of ${cart.title}`"> -->
            </td>
            <td>
              <span class="product-price">{{cart.price}} {{currency}}</span>
            </td>
            <td>
              <div class="counter-block">
                <span class="minus" @click="decreaseQuantity(cart)"></span>
                <input type="text" v-model="cart.quantity" class="text" name="quantity" value="1" ref="product">
                <span class="plus" @click="increaseQuantity(cart)" data-max="1000"></span>
            </div>
            </td>
            <td>
              <button class="btn-primary red-style" @click="deleteProductCart(cart)">Удалить из корзины</button>
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
        <button class="btn-primary green-style" @click="$store.dispatch('checkout')">Оформить заказ</button>
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

      getCartItems(){
        console.log(this.products, "CartItems");

      },
      ...mapGetters({
        carts:'cartProducts',
        total:'cartTotal',
        currency: 'cartCurrency',
    
      }),
      ...mapState({
          checkoutStatus: 'checkoutStatus',
          carts1: 'cart',
      })
    },

    mounted: function() {
      console.log(this.carts.length == 0);
      if(this.carts.length == 0){
        var fetchCarts = JSON.parse(localStorage.getItem("cart"));
        console.log(fetchCarts, "Cart");
        var resultCarts = [];
        Object.entries(fetchCarts).forEach(function (item) {
          console.log(item[1][0]); // key
          item[1][0]['product']['quantity'] = item[1][0]['quantity'];
          resultCarts.push(item[1][0]['product'])
        });

        console.log(resultCarts, "Cart array");
        this.useStorage = true;
        this.carts = resultCarts;
      }
    },

    data() {
      return {
        carts: [],
        useStorage: false,
      };
    },


    methods: {
       /**
       * Отображение оповещение задачи
       */
      deleteProductFromCart(product) {
      
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


      deleteAllCart(){
        localStorage.removeItem("cart");
        this.cleanCart();
      },

      ...mapActions({
        fetchProducts: 'fetchProducts',
        deleteProductCart: 'deleteProductCart',
        cleanCart: 'cleanCart',
      })

    },

};
</script>

<style lang="scss" scoped> 
@import "../scss/components/Cart.scss";

</style>
