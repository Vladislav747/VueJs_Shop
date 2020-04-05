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
   
.product {
  margin: 10px;
  width: 30%;
  border-radius: 10px;
  cursor: pointer;

  .product-inner {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #e1e1e1;
    transition: box-shadow 0.2s ease-in-out;

    &:hover {
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    }
  }

  .product-header--top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5%;

    .product-title {
      font-weight: bold;
      padding-top: 2px;
    }

    .product-sticker {
      color: black;
      float: right;
      font-size: 0.9rem;
      border-radius: 5px;
      padding: 3px 10px 2px;
      text-transform: uppercase;
      border-radius: 2px;
    }
  }

  .price{
    font-weight: 700;
    line-height: 15px;
    white-space: normal;
  }

  .image-wrapper .product-image{
    width: 100%;
    max-height: 280px;
  }

  @media screen and (max-width: 550px) {
    .image-wrapper .product-image{
      max-width: 140px;
      max-height: 280px;
    }
  }

  .buy-block{
      color: black;
      float: right;
      font-size: 0.9rem;
      border-radius: 5px;
      padding: 3px 10px 2px;
      text-transform: uppercase;
      border-radius: 2px;
      margin: 1rem 0;
      
    
      .add-to-cart-btn{

        &:hover{
          opacity: 1;
        }
      }
    }

  .product-properties{

    .price-block{
      margin: 0 auto;
      padding: 15px;
      text-align: center;
    }

  }

  .product-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    flex-direction: column;

    .counter_block{
      box-sizing: border-box;
      border: 1px solid #f3f3f5;
      background: #f3f3f5;
      display: inline-block;
      border-radius: 2px;
      padding: 5px;
      
      >span:before{
        display: inline-block;
        content: "";
        width: 14px;
        height: 17px;
        background: url(/bitrix/templates/aspro_next/images/svg/ai.svg) -80px -191px no-repeat;
        vertical-align: middle;
      }

      input[type="text"]{
        width: 34px;
        border: 0;
        border-left: 1px solid #f3f3f5;
        border-right: 1px solid #f3f3f5;
        background: #f3f3f5;
        color: #666;
        font-size: 13px;
        height: 34px;
        border-radius: 0;
        text-align: center;
        vertical-align: top;
        line-height: 13px;
        padding: 20px 3px;
        font-weight: 700;
      }

      .minus{
        line-height: 40px;
        display: inline-block;
        cursor: pointer;
        vertical-align: top;

        &:before{
          background: url(../assets/minus-solid.svg);
          vertical-align: middle;
        }
      }

      .plus{
        line-height: 40px;
        display: inline-block;
        cursor: pointer;

        &:before{
          background: url(../assets/plus-solid.svg);
          vertical-align: middle;
        }
      }
      
    }

    .product-icons {
      margin-right: -10px;

      .product-icons--link {
        display: inline-block;
        padding: 0 10px;
        cursor: pointer;
      }
    }    
  }

  .image,
  .spacer {
    background-position: center;
    background-size: cover;
    height: 100%;
    max-width: 100%;
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    text-align: center;
  }

  .product-properties {
    word-wrap: break-word;
    padding: 15px;
  }

}

@media screen and (max-width: 550px) {

  .product {
    flex: 0 0 100%;
    padding: 5%;

    .description {
      word-wrap: break-word;
      width: 250px;
    }
  }
}

@media screen and (max-width: 800px) {
  .product {
    flex: 0 0 calc(50% - calc(1rem * 0.55));
  }
 
}
</style>
