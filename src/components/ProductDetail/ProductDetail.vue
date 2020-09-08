<template>

  <div v-if="isLoading" class="lds-dual-ring"></div>

  <div v-else class="product-container">
    
    <div class="product-detail">

      <div class="product-detail__top">

        <div class="header-product">
          <div class="header-title">
            <h3>{{ product.name }}</h3>
          </div>
        </div>


        <div class="product-image-wrapper">
          <div class="image-wrapper">
            <img 
              class="product-image" 
              :src="require(`@/static/images/${product.srcImage}`)" 
              :alt="`Image of ${product.srcImage}`" 
              :title="`Title of ${product.srcImage}`" />
          </div>

          <span class="product-sale" v-if="product.sale">
              Акция
          </span>

        </div>
        
      </div>

      <div class="product-detail__bottom">
        <div class="product-rating">
					<h4>Оценка товара</h4>
					<star-rating-card
						:disabled="true"
						ref="starComponent"
					/>
        </div>

        <div class="stock-block property-section">
          <div 
            class="stock available"
            v-if="inStock(product.stock)"
          >
            В наличии
          </div>
          <div 
            class="stock not-available" 
            v-else
          >
            Нет в наличии
          </div>
        </div>

			
			<div class="price-block">
				<span class="price">{{product.price}} <span class="currency">{{currency}}</span></span>
			</div>
		

		<div class="buy-block">
		
			<div class="counter-block">
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
		
				<div class="cart-block">
					<button 
						@click="addProductCart(product, quantity)" 
						class="add-to-cart-btn btn-primary">Купить товар</button>
				</div>
				
		</div>


        <div class="manufacturer product-section">
          
          <div class="manufacturer__title property-title">
              <h5>Производитель:</h5>
          </div>

          <div class="manufacturer__text property-value">
              <h6>{{ product.manufacturer }}</h6>
          </div>
        </div>

        <div class="category product-section">
          
          <div class="category__title property-title">
              <h5>Категория:</h5>
          </div>

          <div class="category__text property-value">
              <p>{{ product.category }}</p>
          </div>
        </div>


        <div class="product-section desctiption">

			<div class="description__title property-title">
				<h5>Описание:</h5>
			</div>

			<div class="description__text property-value">
				{{ product.description }}
			</div>
        </div>
		
      </div>
    </div>

    <comment-form 
      :product_id="product.id"
      :profile_autor="profile_autor"
      :right_leave_review="canUserLeaveReview"
      v-on:average_rating="putRatingInCard"
    />
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import { showNoty } from "@/helpers";

import CommentForm from '@/components/CommentForm/CommentForm.vue';
import StarRatingCard from '@/components/StarRatingCard/StarRatingCard.vue';

export default {


  /*
    TODO:
      У каждого товара есть страница с информацией о нем: наименовение, изображение, описание,
     стоимость и пользовательская оценка.На странице любой  
     зарегистрированный пользователь может оставить к товару комментарий. 
     Комментарии видят все пользователи, но отвечать на них не могут. 
     Комментарий может оставить любой пользователь, а поставить товару оценку
      только тот, кто уже купил.
     Оценка считается как средняя оценка всех пользователей.
  
  
  */
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
        averageRating: '',
        sale:'',
        
      },
      isLoading:true,
      quantity: 1,
      profile_autor: "Владислав Кудряков",

    };
  },

  computed: {
    
    //Только пользователь который купил этот товар может оставлять отзывы на него
    canUserLeaveReview: function(){
      
		var localItems = localStorage.getItem("boughtItems")
		
		//Товары которые клиент приобрел
		var boughtItemsId = JSON.parse(localItems);
		if(boughtItemsId){
			
			var product = this.product;
			var ourProduct = boughtItemsId.some(function(elem){
			return elem.id == product.id
			})
		}

		return ourProduct;
      
    },

    ...mapGetters({
      currency: 'cartCurrency',
    }),
  },

  

 

  mounted() {
    this.getProduct();
  },

  updated(){
	this.updateLoginProfile();
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
          showNoty("Такой продукт не найден");
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

    increaseQuantity(){
      this.quantity += 1;

    },
    decreaseQuantity(){
      if(this.quantity > 1){
        this.quantity -= 1;
      }
    },

     putRatingInCard(data){
        var starRatingComponent = this.$refs.starComponent;
        starRatingComponent.value_stars = data;   
     },

     // TODO: Изменение количества одного и того же товара - изменение в localStorage и vuex 
    
    addProductCart(product, quantity){

		//Заносим данные в localStorage
		var productItem = [{product, quantity}]
		var productSum = 0;
		var totalItems, totalSum;
		var cartItems = {};
      
      if (localStorage.getItem('cart')) {
		cartItems = JSON.parse(localStorage.getItem('cart'));
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

          productSum = parseInt(product.price) * parseInt(quantity);

          localStorage.setItem('totalSum', totalSum + productSum);
          localStorage.setItem('totalItems', totalItems + 1);
        }
      } else if(!localStorage.getItem('totalSum') && !localStorage.getItem('totalItems')) {
         
          cartItems[Object.keys(cartItems).length] = productItem;
          localStorage.setItem('cart', JSON.stringify(cartItems));

          productSum = parseInt(product.price) * parseInt(quantity);
          localStorage.setItem('totalSum', productSum);
          totalItems = 1;
          
          localStorage.setItem('totalItems', totalItems);
          this.addProductToCart({product, quantity});
      }
      
    },

    inStock(stockQunatity){
      return stockQunatity > 0;
	},
	
	updateLoginProfile(){

		var localLogin = localStorage.getItem('userLogin');
		var localLogged = localStorage.getItem('isLogined');

		if(localLogin && localLogged){
			this.profile_autor = localLogin;
		}
	},


    ...mapActions({
      addProductToCart: 'addProductToCart',
    })


  }
};
</script>

<style lang="scss" scoped>

//preloader styles
@import "@/scss/preloader.scss";
@import "./ProductDetail.scss";
</style>
