<template>
  <section class="product">
    <div class="product-inner">
      <div 
        class="product-header" 
        @click="viewTask(product.id)">
        <div class="product-header--top">
          <div class="product-title">{{ product.name }}</div>
        </div>
        <div class="image-wrapper">
          <img 
            class="product-image" 
            :src="require(`@/static/images/${product.srcImage}`)" 
            :alt="`Image of ${product.srcImage}`" 
            :title="`Title of ${product.srcImage}`" />
        </div>
      </div>
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
          <span 
            class="minus" 
            @click="decreaseQuantity(quantity)"></span>
          <input 
            type="text" 
            v-model="quantity" 
            class="text" 
            name="quantity" 
            value="1">
          <span 
            class="plus" 
            @click="increaseQuantity(quantity)" 
            data-max="1000"></span>
        </div>

        <div class="buy-block">
          <button 
            @click="addProductCart(product, quantity)" 
            class="add-to-cart-btn btn-primary">В корзину</button>
        </div>
        
      </div>
        
    </div>
  </section>
</template>

<script>
import Noty from "noty";
import { showNoty } from "@/utility";
import {mapState, mapGetters, mapActions} from 'vuex'

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
    // TODO: Изменение количества одного и того же товара - изменение в localStorage и vuex 
    
    addProductCart(product, quantity){

      //Заносим данные в localStorage
      var productItem = [{product, quantity}]
      console.log(productItem, 'productItem');
      
      var totalItems, totalSum;
      
      if (localStorage.getItem('cart')) {
        var cartItems = JSON.parse(localStorage.getItem('cart'));
        var cartItem = false;

        /* Проверяем что нет подобного объект уже в нашем localStorage */
        Object.entries(cartItems).forEach(function (item) {
          if(item["1"]["0"]["product"]["id"] == product.id){
           cartItem = true;
          }
        });

        if(!cartItem) {
          cartItems[Object.keys(cartItems).length] = productItem;
          localStorage.setItem('cart', JSON.stringify(cartItems));
          this.addProductToCart({product, quantity});

          totalSum = parseInt(localStorage.getItem('totalSum'));
          totalItems = parseInt(localStorage.getItem('totalItems'));

          var productSum = parseInt(product.price) * parseInt(quantity);

          localStorage.setItem('totalSum', totalSum + productSum);
          localStorage.setItem('totalItems', totalItems + 1);
        }
      } else if(!localStorage.getItem('totalSum') && !localStorage.getItem('totalItems')) {
          var cartItems = {};
          cartItems[Object.keys(cartItems).length] = productItem;
          localStorage.setItem('cart', JSON.stringify(cartItems));

          var productSum = parseInt(product.price) * parseInt(quantity);
          localStorage.setItem('totalSum', productSum);
          totalItems = 1;
          
          localStorage.setItem('totalItems', totalItems);
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
