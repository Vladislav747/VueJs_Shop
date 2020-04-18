<template>
   <div class="shopping-cart">
    <div v-if="!getCarts"  class="empty-cart">
      <p>Ваша корзина пуста.</p>
      <router-link to="/">
        <button class="shop-cart">Вернуться в каталог</button>
      </router-link>
    </div>

    <div v-else class="shopping-cart-items">
      <div class="shopping-cart__left">
        <div class="shopping-cart-title">
          <p>Всего в корзине товаров {{this.carts.length}}</p>
          <button class="btn-primary" @click="deleteAllCart()">Очистить корзину</button>
        </div>
        <ul class="cart-product-card">
          <li 
            v-for="cart in carts" 
            :key="cart.id" 
            @click="chooseItem(cart)" 
            :class="{ 'selected': isSelected(cart.id) }">

            <div class="card-row">
              <span class="product-title">{{cart.name}}</span>
            </div>
            <img :src="require(`@/static/images/${cart.srcImage}`)" :alt="`Image of ${cart.title}`">
            <div class="card-row">
              <span class="product-price">{{cart.price}} {{currency}}</span>
            </div>
            <div class="card-row">
              <div class="counter-block cart-counter">
                <span class="minus" @click="decreaseQuantity(cart)"></span>
                <input type="text" v-model="cart.quantity" class="text" name="quantity" value="1" ref="product">
                <span class="plus" @click="increaseQuantity(cart)" data-max="1000"></span>
              </div>
            </div>
            <button class="btn-primary red-style" @click="deleteProductFromCart(cart)">Удалить из корзины</button>
          </li>
        </ul>
      </div>
      <div class="shopping-cart__right">
        <div class="cart-checkout">
          <div v-if="hasSum" class="cart-sum">
            <h3>Сумма корзины : </h3>
            <p>{{ total}}  {{currency}}</p>
            <button class="btn-primary green-style" @click="checkout()">Оформить заказ</button>
          </div>
        </div> 
      </div>  
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'


export default {

  /* TODO:
  Страница с корзиной, в нее складываются товары, количеством товаров в корзине можно управлять.
   При перезаходе на сайт корзина не очищается. 
   Должна быть возможность выделить только нужные товары и купить их. Есть кнопка купить.
  
  
  */
    name: "Cart",

    computed: {
        getCarts(){
          console.log(this.carts.length, "Store Carts");
          var fetchCarts = localStorage.getItem("cart");
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
        selectedItems:[],
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

      chooseItem(item){
        console.log(item);
        console.log(this.selectedItems);

        if(this.selectedItems.includes(item.id)){
          var oldSelected = this.selectedItems;
          this.selectedItems = oldSelected.filter(element => element !== item.id);
          console.log(this.selectedItems, "check");
          //Очищаем данные в localStorage
          var localOldSelected = JSON.parse(localStorage.getItem("selectedItems"));
          var newLocalSelected = localOldSelected.filter(element => element !== item.id);
          localStorage.setItem('selectedItems', JSON.stringify(newLocalSelected));
          
        }else{
          this.selectedItems.push(item.id);
          
          //Чтобы не терять данные при перезагрузке страницы
          var selectedItems = JSON.parse(localStorage.getItem("selectedItems"));
          if(!selectedItems){
            localStorage.setItem('selectedItems', JSON.stringify(this.selectedItems));
          }else{
            selectedItems.push(item.id);
            localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
          }
          
          

        }
      },

      isSelected(item){
        return this.selectedItems.includes(item);
      },

      checkout(){
        if(this.selectedItems.length > 0){
          console.log("Заказ оформлен только выбранные товары " + this.selectedItems);
          this.$router.push({ name: 'checkout'}) // -> /user/123
        }else{
          console.log("Заказ оформлен " + this.carts);
          this.$router.push({ name: 'checkout'}) // -> /user/123
        }

        //$store.dispatch('checkout');
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
