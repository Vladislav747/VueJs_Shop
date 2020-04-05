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
            <td>Название товара</td>
            <td>Изображение товара</td>
            <td>Цена</td>
            <td>Количество товара</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product._id" >
            <td>
              <span class="product-title">{{product.title}}</span>
            </td>
            <td>
              <img :src="require(`@/static/images/${product.img}`)" :alt="`Image of ${product.title}`">
            </td>
            <td>
              <span class="product-price">{{product.price | currency}}</span>
            </td>
            <td>
              <span class="product-cart-quantity">{{product.quantity}}</span>
            </td>
            <td>
              <button class="btn-primary red-style">Удалить из корзины</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="cart-checkout">
        <h3>Сумма корзины : </h3>
        <p>{{ total | currency}}</p>
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

.shopping-cart{

  .empty-cart {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%,-45%);

    p{
      margin-bottom: 30px;
    }
  }

  .shopping-cart-items {
    display: flex;
    flex-direction: row;
  }

  .cart-product-card {
    display: table;
    margin-right: 40px;
    margin-bottom: 40px;
    border: 1px solid #000;

    td{
      padding: 20px;
      border: 1px solid #000;
      text-align: center;
    }
  }

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

.product-price {
  margin-bottom: 5px;
}
img {
  max-height: 100px;
  max-width: 100px;
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
