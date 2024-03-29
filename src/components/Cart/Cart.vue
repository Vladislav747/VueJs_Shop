<template>
  <div class="shopping-cart">
    <div class="shopping-cart__title">Корзина</div>
    <div v-if="!getCarts" class="empty-cart">
      <p>Ваша корзина пуста.</p>
      <router-link to="/">
        <button class="btn-primary shop-cart element-light-green">
          Вернуться в каталог
        </button>
      </router-link>
    </div>
    <div v-else class="shopping-cart__bottom">
      <div class="shopping-cart__left">
        <div class="shopping-cart__controls">
          <UICheckbox />
          <span class="choose-all">Выбрать все</span>
          <span class="delete-chosen">Удалить выбранные</span>
        </div>

        <b-card-group class="cart-product-card">
          <cart-item
            v-for="cart in carts"
            :key="cart.id"
            :class="{ selected: isSelected(cart) }"
            :item-title="cart.name"
            :src-image="`${cart.srcImage}`"
            v-on:
          >

          </cart-item>
        </b-card-group>
      </div>

      <div class="shopping-cart__right">
        <div class="cart-checkout">
          <div v-if="hasSum" class="cart-sum">
            <p class="bold">Всего в корзине товаров: {{ this.carts.length }}</p>
            <span class="bold">Сумма корзины : </span>
            <p class="sum">{{ total }} {{ currency }}</p>
            <button class="btn-primary element-light-green" @click="checkout">
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import firebase from "firebase/app";

import { bus } from "@/helpers/bus.js";
import { showNoty } from "@/helpers";

import CartItem from "@/components/CartItem/CartItem";
import UICheckbox from "@/UIKit/UICheckbox/UICheckbox";

export default {
  /* TODO:
Страница с корзиной, в нее складываются товары, количеством товаров в корзине можно управлять.
	При перезаходе на сайт корзина не очищается. 
	Должна быть возможность выделить только нужные товары и купить их. Есть кнопка купить.
*/
  name: "Cart",

  components: {
    CartItem,
    UICheckbox,
  },

  data() {
    return {
      carts: [],
      total: "",
      selectedItems: [],
    };
  },

  computed: {
    //Получить товары корзины
    getCarts() {
      let fetchCarts = localStorage.getItem("cart");
      if (!fetchCarts) {
        return false;

        //при обновлении корзины
      } else if (this.cartsItems.length == 0) {
        this.carts = this.mapObjectToArr("cart");
      } else {
        this.carts = this.cartsItems;
      }

      return this.carts.length > 0;
    },

    hasSum() {
      const totalSum = parseInt(localStorage.getItem("totalSum"));

      if (this.$store.getters.cartTotal > 0) {
        this.total = this.$store.getters.cartTotal;
      } else if (totalSum > 0) {
        this.total = totalSum;
      }
      return this.total > 0;
    },

    ...mapGetters({
      currency: "cartCurrency",
      cartsItems: "cartProducts",
      cartSelected: "cartSelected",
    }),
  },

  methods: {
    increaseQuantity(product) {
      product.quantity += 1;
      this.$forceUpdate();
    },

    decreaseQuantity(product) {
      if (product.quantity > 1) {
        product.quantity -= 1;
      }
      this.$forceUpdate();
    },

    deleteAllCart() {
      localStorage.removeItem("cart");
      localStorage.removeItem("totalSum");
      localStorage.removeItem("totalItems");
      localStorage.removeItem("selectedItems");

      //Генерируем событие для шапки и пересчета кол-ва товаров в корзине
      bus.$emit("totalItemsChanged", "");
      this.cleanCart();
      this.carts = [];
    },

    deleteProductFromCart(cart) {
      let fetchCarts = JSON.parse(localStorage.getItem("cart"));
      let totalSum = parseInt(localStorage.getItem("totalSum"));
      let totalItems = parseInt(localStorage.getItem("totalItems"));
      let newSum;

      //Плохая структура массива данных поэтому приходится отлавливать
      for (let [key, value] of Object.entries(fetchCarts)) {
        if (value["0"].product.id == cart.id) {
          delete fetchCarts[key];

          newSum =
            totalSum -
            parseInt(value["0"]["product"]["price"]) *
              parseInt(value["0"]["quantity"]);
          localStorage.setItem("totalSum", newSum);
          localStorage.setItem("totalItems", totalItems - 1);

          //Генерируем событие для шапки и пересчета кол-ва товаров в корзине
          bus.$emit("totalItemsChanged", totalItems - 1);
        }
      }

      localStorage.setItem("cart", JSON.stringify(fetchCarts));
      this.carts = this.mapObjectToArr("cart");
      this.total = newSum;
      this.deleteProductCart(cart);
    },

    mapObjectToArr(localItem) {
      let resultCarts = [];
      let fetchCarts = JSON.parse(localStorage.getItem(localItem));
      Object.entries(fetchCarts).forEach(function(item) {
        item[1][0]["product"]["quantity"] = item[1][0]["quantity"];
        resultCarts.push(item[1][0]["product"]);
      });

      return resultCarts;
    },

    chooseItem(item) {
      let selectedElement = this.selectedItems.find(el => el.id === item.id);

      if (selectedElement) {
        let oldSelected = this.selectedItems;
        this.selectedItems = oldSelected.filter(
          element => element.id !== item.id
        );
        this.deleteSelectedItem(item.id);

        //Очищаем данные в localStorage
        let localOldSelected = JSON.parse(
          localStorage.getItem("selectedItems")
        );
        let newLocalSelected = localOldSelected.filter(
          element => element.id !== item.id
        );
        localStorage.setItem("selectedItems", JSON.stringify(newLocalSelected));
      } else {
        const [id, quantity] = item;
        let newEl = { id, quantity };
        this.selectedItems.push(newEl);
        this.addSelectedItem(newEl);
        //Чтобы не терять данные при перезагрузке страницы
        let selectedItems = JSON.parse(localStorage.getItem("selectedItems"));
        if (!selectedItems) {
          localStorage.setItem(
            "selectedItems",
            JSON.stringify(this.selectedItems)
          );
        } else {
          selectedItems.push(newEl);
          localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
        }
      }
    },

    isSelected(el) {
      let selectedElement = this.selectedItems.find(item => item.id === el.id);
      return selectedElement !== undefined;
    },

    checkout() {
      if (this.selectedItems.length > 0) {
        showNoty(
          "Заказ оформлен только выбранные товары " + this.selectedItems
        );
        this.createOrder(this.selectedItems);
        this.$router.push({ name: "checkout" });
      } else {
        showNoty("Заказ оформлен " + this.carts);
        this.$router.push({ name: "checkout" });
        this.createOrder(this.carts);
      }
    },

    /**
     * Создать заказ
     * @param {array} carts - товары
     */
    createOrder(carts) {
      const db = firebase.firestore();
      const usersCollection = db.collection("users");
      const user = localStorage.getItem("userLogin");

      let idCarts = carts.map(function(element) {
        return element.id;
      });

      usersCollection
        .where("login", "==", user)
        .get()
        .then(foundUsers => {
          foundUsers.docs.forEach(function(doc) {
            let userRef = usersCollection.doc(doc.id);
            userRef.update({
              goods: idCarts,
            });
          });
        });
      let localStorage = localStorage.getItem("boughtItems");

      if (!localStorage) {
        localStorage.setItem("boughtItems", JSON.stringify(user.goods));
      }

      this.deleteAllCart();
    },

    ...mapActions({
      fetchProducts: "fetchProducts",
      deleteProductCart: "deleteProductCart",
      cleanCart: "cleanCart",
      addSelectedItem: "addSelectedItem",
      deleteSelectedItem: "deleteSelectedItem",
    }),
  },
};
</script>

<style lang="scss" scoped>
@import "./Cart.scss";
</style>
