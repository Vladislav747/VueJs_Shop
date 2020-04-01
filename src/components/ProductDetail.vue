<template>

  <div v-if="isLoading" class="lds-dual-ring"></div>

  <div v-else class="product-container">
    
    <div class="product">


      <div class="header-product">
        <div class="header-title">
          <h3>{{ product.name }}</h3>
        </div>
        <div class="category">
          <span>{{ product.category }}</span>
        </div>
      </div>


      <div class="image-wrapper">
          <img class="product-image" :src="require(`@/static/images/${product.srcImage}`)" :alt="`Image of ${product.srcImage}`" :title="`Title of ${product.srcImage}`" />
      </div>
      <div class="description">
        
        <div class="description__title">
            <h4>Описание:</h4>
        </div>

        <div class="description__text">
            <p>{{ product.description }}</p>
        </div>
      </div>



      <div class="price-block">
        <span class="price">{{product.price}} <span class="currency">руб/шт</span></span>
      </div>

      <div class="counter_block">
        <span class="minus" @click="decreaseQuantity(quantity)"></span>
        <input type="text" v-model="quantity" class="text" name="quantity" value="1">
        <span class="plus" @click="increaseQuantity(quantity)" data-max="1000"></span>
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

import { showNoty } from "../utility";

export default {
  name: "ProductDetail",

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

    .header-product{
      display: flex;
      justify-content: space-between;
    }

    h3,
    h4 {
      margin-bottom: 1rem;

      span {
        color: #737373;
        float: right;
        font-size: 1rem;
        font-weight: normal;
      }
    }

    .image-wrapper {
      background-position: center;
      background-size: cover;
      text-align: center;

      .product-image{
        max-width: 100%;
        max-height: 100%;
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

    .description {
      margin: 1rem 0;
      word-break: break-word;
    }

    /*Input counter block styles*/
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
