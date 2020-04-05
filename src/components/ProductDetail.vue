<template>

  <div v-if="isLoading" class="lds-dual-ring"></div>

  <div v-else class="product-container">
    
    <div class="product">

      <div class="left-col">

        <div class="header-product">
          <div class="header-title">
            <h3>{{ product.name }}</h3>
          </div>
        </div>

        <div class="image-wrapper">
          <img class="product-image" :src="require(`@/static/images/${product.srcImage}`)" :alt="`Image of ${product.srcImage}`" :title="`Title of ${product.srcImage}`" />
        </div>
      </div>

      <div class="right-col">
        <div class="description product-section">
          
          <div class="description__title">
              <h4>Описание:</h4>
          </div>

          <div class="description__text">
              <p>{{ product.description }}</p>
          </div>
        </div>

        <div class="category product-section">
          <span><h4>Категория</h4>{{ product.category }}</span>
        </div>

        <div class="price-block product-section">
          <span class="price">{{product.price}} <span class="currency">{{currency}}</span></span>
        </div>

        <div class="quantity-block product-section">
          <div class="counter-block">
            <span class="minus" @click="decreaseQuantity(quantity)"></span>
            <input type="text" v-model="quantity" class="text" name="quantity" value="1">
            <span class="plus" @click="increaseQuantity(quantity)" data-max="1000"></span>
          </div>
        </div>

        <div class="buy-block">
            <button @click="addProductToCart(product)" class="add-to-cart-btn btn-primary">Купить товар</button>
        </div>
      </div>
    </div>

    <div class="reviews-container">

      <div class="reviews">
        <div class="reviews__title">
            <h4>Отзывы:</h4>
        </div>
        <div class="reviews__text">
            <p>Заглушка отзывы</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Noty from "noty";
import {mapState, mapGetters, mapActions} from 'vuex'
import { showNoty } from "../utility";

export default {
  name: "ProductDetail",

  computed: {
    ...mapGetters({
      currency: 'cartCurrency',
    }),
  },

  data() {
    return {
      product: {
        name: "",
        category: "",
        description: "",
        manufacturer:"",
        price:"",
        currency:"",
        srcImage:"",
        
      },
      isLoading:true,
      quantity: 1,
    };
  },

  mounted() {
    this.getProduct();
  },

  methods: {
    /**
     * Получить задачу
     */
    async getProduct() {
      try {
        const response = await this.$http.get("products/" + this.$route.params.id);

        //Если по какой то причине товара не существует в базе данных или произошла ошибка
        if (response.data === null) {
          //Перенаправление на общую страницу товаров
          this.$router.push({ name: "products-list" });
          showNoty("Requested product not found.");
          return;
        }

        this.product = response.data;
        this.isLoading = false;
      } catch (error) {
        showNoty("ProductDetail " + error);
      }
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

  }
};
</script>

<style lang="scss" scoped>

//preloader styles
@import "../scss/preloader.scss";

.product-container {

  width: 50%;
  min-height: 300px;
  margin: 1rem auto;
  text-align: center;

  .product {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
      0 3px 1px -2px rgba(0, 0, 0, 0.2);
    margin-bottom: 2rem;
    padding: 1rem;
    width: 100%;
    min-height: 300px;
    display: flex;


    .left-col{

      .header-product{
        display: flex;
        justify-content: space-between;
      }

      h3,
      h4 {
        margin-bottom: 1rem;
      }

      span {
        color: #737373;
        float: right;
        font-size: 1rem;
        font-weight: normal;
      }


    }

    .right-col{

      margin-left: 50px;
      display: flex;
      flex-direction: column;


      .image-wrapper {
        background-position: center;
        background-size: cover;
        text-align: center;

        .product-image{
          max-width: 100%;
          max-height: 100%;
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
      
    }

    }

    

    @media screen and (max-width: 550px) {
      .image-wrapper {
        .product-image{
        max-width: 140px;
        max-height: 280px;
        }
      }
    }

    .product-section {
      margin: 1rem 0;
      word-break: break-word;
    }

    
    /*Input counter block styles*/


  }

  .reviews-container{
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
      0 3px 1px -2px rgba(0, 0, 0, 0.2);
    margin-bottom: 1rem;
    padding: 1rem;
    width: 100%;
    margin: 1rem auto;
    min-height: 300px;
  }
}

 @media screen and (max-width: 550px) {
    .product-container {
      width: 80%;
    }
  }
</style>
