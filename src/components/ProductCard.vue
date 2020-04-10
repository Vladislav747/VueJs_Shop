<template>
  <section class="product">
    <div class="product-inner">
      <div class="product-header" @click="viewTask(product.id)">
        <div class="product-header--top">
          <div class="product-title">{{ product.name }}</div>
        </div>
        <div class="image-wrapper">
          <img class= "product-image" :src="require(`@/static/images/${product.srcImage}`)" :alt="`Image of ${product.srcImage}`" :title="`Title of ${product.srcImage}`" />
        </div>
      </div>
      
      <star-rating-card></star-rating-card>
      <div class="product-properties">
        <div class="category property-section">
          Категория: {{ product.category}}
        </div>
        <div class="manufacturer property-section">
          Производитель: {{ product.manufacturer}}
        </div>
        <!-- <div class="description">Описание:{{ product.description }}</div> -->
        <div class="stock-block property-section">
          <div class="stock">
            В наличии: {{ product.stock }}
          </div>
        </div>
        <div class="price-block">
          <span class="price">{{product.price}} <span class="currency">{{currency}}</span></span>
        </div>
      </div> 
     
      <div class="product-footer">
       
        <div class="counter_block">
          <span class="minus" @click="decreaseQuantity(quantity)"></span>
          <input type="text" v-model="quantity" class="text" name="quantity" value="1">
          <span class="plus" @click="increaseQuantity(quantity)" data-max="1000"></span>
        </div>

        <div class="buy-block">
          <button @click="addProductCart(product, quantity)" class="add-to-cart-btn btn-primary">В корзину</button>
        </div>
        
      </div>
        
    </div>
  </section>
</template>

<script>
import Noty from "noty";
import { showNoty } from "../utility";
import {mapState, mapGetters, mapActions} from 'vuex'
import StarRatingCard from '../components/StarRatingCard.vue';

export default {
  name: "ProductCard",

  props: {
    product: {
      type: Object,
      default: function() {
        return{
          name: "",
          category: "",
          description: "",
          manufacturer:"",
          price:"",
          currency:"",
          stock:"",
          srcImage:"",
        }
      }
    }
  },

  components: {
    StarRatingCard
  },

  data() {
    return {
      quantity: 1,
    };
  },

  methods: {
    /**
     * Переход на детальное отображение задачи
     * @param {number} id - id задачи
     *
     */
    viewTask(id) {
      this.$router.push({ name: "view-product", params: { id } });
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

    increaseQuantity(quantity){
      this.quantity += 1;

    },
    decreaseQuantity(quantity){
      if(this.quantity > 1){
        this.quantity -= 1;
      }
    },

    addProductCart(product, quantity){

      //Заносим данные в localStorage
      var productItem = [{product, quantity}]
      console.log(productItem, 'productItem');
      
      if (localStorage.getItem('cart')) {
        var cartItems = JSON.parse(localStorage.getItem('cart'));
        //console.log(cartItems, "cartItems productAdd");
        var cartItem = false;
        Object.entries(cartItems).forEach(function (item) {
          // console.log(item["1"]["0"]["product"]["id"], "product ID");
          // console.log(product.id, "product ID");
          if(item["1"]["0"]["product"]["id"] == product.id){
           cartItem = true;
          }
        });
        // console.log(cartItem, 'value');
        if(!cartItem) {
          cartItems[Object.keys(cartItems).length] = productItem;
          localStorage.setItem('cart', JSON.stringify(cartItems));
          this.addProductToCart({product, quantity});
        }
      } else {
        var cartItems = {};
        cartItems[Object.keys(cartItems).length] = productItem;
        localStorage.setItem('cart', JSON.stringify(cartItems));

        this.addProductToCart({product, quantity});
      }
      
      
    },

    ...mapActions({
      addProductToCart: 'addProductToCart',
    })
  },

  mounted: function() {
    this.$root.$on('changeTheme', this.changeTheme);
  },

  computed: {
    ...mapGetters({
      currency: 'cartCurrency',
    }),
  },


  
};
</script>

<style lang="scss">
  @import "../scss/components/ProductCard.scss";
</style>
