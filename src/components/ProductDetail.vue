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
          <img 
            class="product-image" 
            :src="require(`@/static/images/${product.srcImage}`)" 
            :alt="`Image of ${product.srcImage}`" 
            :title="`Title of ${product.srcImage}`" />
        </div>
      </div>

      <div class="right-col">
        <div class="product-rating">
          <star-rating-card
            :disabled="true"
          />
        </div>
        <div class="description product-section">      

          <div class="description__title property-title">
              <h4>Описание:</h4>
          </div>

          <div class="description__text property-value">
              <p>{{ product.description }}</p>
          </div>
        </div>
        

        <div class="manufacturer product-section">
          
          <div class="manufacturer__title property-title">
              <h4>Производитель:</h4>
          </div>

          <div class="manufacturer__text property-value">
              <p>{{ product.manufacturer }}</p>
          </div>
        </div>

        <div class="category product-section">
          
          <div class="category__title property-title">
              <h4>Категория:</h4>
          </div>

          <div class="category__text property-value">
              <p>{{ product.category }}</p>
          </div>
        </div>


        <div class="product-section price-block">
          <span class="price">{{product.price}} <span class="currency">{{currency}}</span></span>
        </div>

        <div class="quantity-block">
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

    <comment-form 
      :product_id="product.id"
      :profile_autor="profile_autor"
      :right_leave_review="canUserLeaveReview"
    />
  </div>
</template>

<script>
import Noty from "noty";
import {mapState, mapGetters, mapActions} from 'vuex'
import { showNoty } from "../utility";
import CommentForm from '../components/CommentForm.vue'
import StarRatingCard from '@/components/StarRatingCard.vue';

export default {
  name: "ProductDetail",

  components: {
    CommentForm,
    StarRatingCard,
  },

   data() {
    return {
      product: {
        id: "",
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
      profile_autor: "Владислав Кудряков",

    };
  },

  computed: {
    
    //Только пользователь который купил этот товар может оставлять отзывы на него
    canUserLeaveReview: function(){
      var localLogin = localStorage.getItem('userLogin');
      var localLogged = localStorage.getItem('isLogined');

      if(localLogin && localLogged){
        this.profile_autor = localLogin;
      }
      
      //Товары которые клиент приобрел
      console.log(this.product.id, "canUserLeaveReview");
      var boughtItemsId = ['5e838243ab5db71bf8408716'];


      var ourProduct = boughtItemsId.find(elem=> elem == this.product.id); 
      
      if(ourProduct){
        return true;
      }else{
        return false;
      }
      
    },

    ...mapGetters({
      currency: 'cartCurrency',
    }),
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
@import "../scss/components/ProductDetail.scss";
</style>
