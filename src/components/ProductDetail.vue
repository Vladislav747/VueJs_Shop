<template>
  <div class="product-container">
    <div v-if="isLoading" class="lds-dual-ring"></div>
    <div v-if="!isLoading" class="product">
      <div class="header-product">
        <div class="header-title">
          <h3>{{ product.name }}</h3>
        </div>
        <div class="category">
          <span>{{ product.category }}</span>
        </div>
      </div>
      <div class="image">
          <img :src="require(`@/static/images/${product.srcImage}`)" :alt="`Image of ${product.srcImage}`" :title="`Title of ${product.srcImage}`" />
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
        <span class="minus"></span>
        <input type="text" class="text" name="quantity" value="1">
        <span class="plus" data-max="1000"></span>
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
        price:"",
        currency:"",
        srcImage:"",
      },
      isLoading:true,
    };
  },

  mounted() {
    this.getProduct();
  },

  computed: {
    
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

//preloader
@import "../scss/preloader.scss";

.product {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
  padding: 1rem;
  width: 60%;
  margin: 1rem auto;
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

  .image {
    background-position: center;
    background-size: cover;
    min-height: 240px;
    text-align: center;
  }

  .description {
    margin: 1rem 0;
    word-break: break-word;
  }

  .datetineDeadline{
    margin-bottom:1rem;
  }

  .tags {
    display: flex;

    .times {
      font-size: 0.9rem;
      margin-bottom: 1rem;

      span {
        margin-left: 3rem;
      }
    }
    

    
  }

  

}

.reviews-container{
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
  padding: 1rem;
  width: 60%;
  margin: 1rem auto;
  min-height: 300px;
}
</style>
