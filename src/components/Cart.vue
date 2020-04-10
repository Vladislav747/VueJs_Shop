<template>
   <div class="shopping-cart">
    <div v-if="!getCarts"  class="empty-cart">
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
            <td> 
              <button class="btn-primary" @click="deleteAllCart()">Очистить корзину</button>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cart in carts" :key="cart.id" >
            <td>
              <input type="checkbox" class="product-checkbox" />
            </td>
            <td>
              <span class="product-title">{{cart.name}}</span>
            </td>
            <td>
              <img :src="require(`@/static/images/${cart.srcImage}`)" :alt="`Image of ${cart.title}`">
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
              <button class="btn-primary red-style" @click="deleteProductFromCart(cart)">Удалить из корзины</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="cart-checkout">
        <div v-if="hasSum" class="cart-sum">
          <h3>Сумма корзины : </h3>
          <p>{{ total}}  {{currency}}</p>
          <!-- <button :disabled="$store.state.cart.length <= 0" @click="$store.dispatch('checkout')">Checkout</button>
          <p class="status" v-if="$store.state.checkoutStatus">{{$store.state.checkoutStatus}}</p> -->
          <!-- <button :disabled="$store.state.cart.length <= 0" @click="$store.dispatch('checkout')">Checkout</button> -->
          <button class="btn-primary green-style" @click="$store.dispatch('checkout')">Оформить заказ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'


export default {
    name: "Cart",

    computed: {
        getCarts(){
          console.log(this.carts.length, "Store Carts");
          var fetchCarts = localStorage.getItem("cart");
          console.log(typeof fetchCarts);
          if(!fetchCarts && this.carts.length == 0){

            return false;

          }else if(this.cartsItems.length == 0){
             this.carts = this.mapObjectToArr("cart");
           
          } else{
             this.carts = this.cartsItems;
          }

          console.log(this.carts, "Store Carts");

          return this.carts.length > 0;
        },

        hasSum(){

          var totalSum = parseInt(localStorage.getItem("totalSum"));

          if(this.$store.getters.cartTotal > 0){
            this.total = this.$store.getters.cartTotal;
          } else if(totalSum > 0){
            this.total = totalSum;
          }

          return this.total > 0;

        },
      
      ...mapGetters({
        currency: 'cartCurrency',
        cartsItems: 'cartProducts'
      }),
      ...mapState({
          checkoutStatus: 'checkoutStatus',
      })
    },
    
    data() {
      return {
        carts: [],
        total: "",
      };
    },


    methods: {

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
        localStorage.removeItem('totalSum');
        localStorage.removeItem('totalItems');
        this.cleanCart();
        this.carts = [];
      },

      deleteProductFromCart(cart){
        var fetchCarts = JSON.parse(localStorage.getItem("cart"));
        var totalSum = parseInt(localStorage.getItem("totalSum"));
        var totalItems = parseInt(localStorage.getItem('totalItems'));
        var newSum;
        console.log(cart, "Товар к удалению");
        console.log(fetchCarts);
        for (let [key, value] of Object.entries(fetchCarts)) {
          if(value["0"].product.id == cart.id){

            delete fetchCarts[key];

            newSum = totalSum - parseInt(value["0"]["product"]["price"]) * parseInt(value["0"]["quantity"]);
            localStorage.setItem('totalSum', newSum);
            localStorage.setItem('totalItems', totalItems - 1);
          }
        }

        localStorage.setItem('cart', JSON.stringify(fetchCarts));
        this.carts = this.mapObjectToArr("cart");
        this.total = newSum;
        this.deleteProductCart(cart);
        
      },

      mapObjectToArr(localItem){
        var resultCarts = [];
        var fetchCarts = JSON.parse(localStorage.getItem(localItem));
        
        Object.entries(fetchCarts).forEach(function (item) {
          console.log(item);
          item[1][0]['product']['quantity'] = item[1][0]['quantity'];
          resultCarts.push(item[1][0]['product'])
        });

        return resultCarts;
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
