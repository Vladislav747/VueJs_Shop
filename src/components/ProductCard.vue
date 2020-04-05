<template>
  <section class="product">
    <div class="product-inner">
      <div class="product-header" @click="viewTask(product.id)">
        <div class="product-header--top">
          <div class="product-title">{{ product.name }}</div>
          <span class="product-sticker top-right">Оценка</span>
        </div>
        <div class="image-wrapper">
          <img class= "product-image" :src="require(`@/static/images/${product.srcImage}`)" :alt="`Image of ${product.srcImage}`" :title="`Title of ${product.srcImage}`" />
        </div>
      </div>

      <div class="product-properties">
        <div class="category">
          Категория: {{ product.category}}</div>
          <div class="manufacturer">
          Производитель: {{ product.manufacturer}}</div>
        <!-- <div class="description">Описание:{{ product.description }}</div> -->
        <div class="stock">В наличии:{{ product.stock }}</div>
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
          <button @click="addProductToCart({product, quantity})" class="add-to-cart-btn btn-primary">В корзину</button>
        </div>
        
      </div>
        
    </div>
  </section>
</template>

<script>
import Noty from "noty";
import { showNoty } from "../utility";
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
