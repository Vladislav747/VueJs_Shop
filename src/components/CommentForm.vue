<template>
    <div class="reviews-container">
      <div class="reviews" >
        
        <ul v-if="!getReviews && this.reviews.length > 0">
        <h3>Отзывы о товаре</h3>
          <li 
            class="review"
            v-for="review in reviews"
            :key="review.id"
            >
            <div class="reviews__title">
              <div class="review__author">
                <p>{{review.autor_login}}</p>
              </div>
              <div class="review__date">
                <h4>{{review.date}}</h4>
              </div>
              
            </div>
            <div class="reviews__rating">
              <p class="rating-title">Оценка товара</p>
              <star-rating-card
                :value="review.rating"
                :disabled="true"
              />
            </div>
            <div class="reviews__text">
              <p class="reviews-title">Комментарий</p>
              <p>{{review.text}}</p>
            </div>
            
          </li>
        </ul>
        <div 
          class="no-reviews"
          v-else
          >
          <p>Нет отзывов</p>
        </div>
      </div>

      <form 
        class="form-review" 
        v-if="right_leave_review"
        @submit.prevent="onUpload">


        <h4>Оставить новый отзыв</h4>
        <div class="form-header">
          <div class="form-profile">
            Пользователь
            {{profile_autor}}
          </div>
          <div class="form-rating">
            Оцените этот товар
            <star-rating-card />
          </div>

        </div>
        <div class="form-body">
          <input 
            type="text" 
            class="form-title"
            v-model="product_review_title"
            placeholder="Заголовок отзыва"
            >
          <span class="textarea-wrapper">
            <textarea
              v-model="product_comment"
              placeholder="Оцените приобретенный товар"
              maxlength="20000"
              name="comment" 
              class="textarea-control" 
              cols="10" 
              rows="8" />

          </span>
          
          <div class="form-actions" >
            <button 
                type="submit"
                class="btn-primary form-btn"
                @click.prevent="createReview"
                >Отправить</button>
            <button 
                type="button"
                class="btn-primary form-btn"
                @click.prevent="cancel"
                >Отменить</button>
          </div>
          
        </div>
      </form>
      <div 
        class="no-form"
        v-else
      >
       <h4>Для того чтобы оставить отзыв вам нужно приобрести данный товар</h4>
      </div>
    </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'
import StarRatingCard from '../components/StarRatingCard.vue';
import firebase from 'firebase/app';
import {generateRandomSeed } from "../utility"

export default {
    name: "CommentForm",

    components:{
      StarRatingCard,
    },

    props:{
      product_id: '',
      profile_autor:'',
      right_leave_review: '',
    },

    data(){
      return {
        product_comment:'',
        file: '',
        filetext: '',
        product_review_title:'',
        imageData: null,
        picture: null,
        uploadValue: 0,
        reviews:[
          {
            id_review: "id_review",
            title: "this.product_review_title",
            text: "this.product_comment",
            product_id: 'Товар нелохой но я видел лучше',
            rating: 5,
            autor_login: 'Владислав Кудряков',
            date: '14 декабря 2020',
          },
          {
          id_review: "id_review",
          title: "this.product_review_title",
          text: "this.product_comment",
          product_id: 'Товар нелохой но я видел лучше',
          rating: 4,
          autor_login: 'Владислав Кудряков',
          date: '14 декабря 2020',
        }
        ],
      }
    },

     computed: {


      getReviews(){

      const db = firebase.firestore();

      var reviews = [];
      var self = this;
      // const productCollection = db.collection('product_comments')

      //   productCollection.where("product_id", "==", this.product_id)
      //   .get().then((docs)=>{

      //     docs.forEach(function (doc) {
      //       var reviewItem = doc.data();  
      //       reviews.push(reviewItem)
      //     })
      //   })
           
        // this.reviews = reviews;
        if(this.reviews.length > 0){
          this.getAverageRating(this.reviews);
        }
        

        return false;
        
      },

    ...mapGetters({
    }),
    ...mapState({
      
    })
  },


    methods: {

        handleFileUpload(){
        this.uploadValue=0;
        this.picture=null;
        this.imageData = event.target.files[0];
      },

      onUpload(){
       this.picture=null;
        const storageRef=firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
        storageRef.on(`state_changed`,snapshot=>{
          this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        }, error=>{console.log(error.message)},
        ()=>{this.uploadValue=100;
          storageRef.snapshot.ref.getDownloadURL().then((url)=>{
            this.picture =url;
          });
      }
      );
    },

    cancel(){
      console.log("Cancel Заглушка - Доделать!"); 
    },

    createReview(){
      console.log("Create Review");

      const db = firebase.firestore();
      var id_review = generateRandomSeed();
      var nowDate = new Date().toLocaleString('ru',
        {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
      });
      db.collection("product_comments").doc(id_review).set({
          id_review: id_review,
          title: this.product_review_title,
          text: this.product_comment,
          product_id: this.product_id,
          rating: 5,
          autor_login: this.profile_autor,
          date: nowDate,
      })

    },

    //Получить среднюю оценку по товару
    getAverageRating(reviews){
      const reviewsRating = reviews.map(this.getRating);

      const ratingTotal = reviewsRating.reduce(this.addRating, 0);

      // Вычисляем и выводим в консоль среднее значение.
      const averageRating = ratingTotal / reviewsRating.length;
      console.log("Average rating:", averageRating);
      this.$emit('average_rating', averageRating);
      



    },

    //Выбрать именно rating
    getRating(review) {
      return review.rating;
    },

    addRating(prev, next) {
      return prev + next;
    },
      
    ...mapActions({
        sendFile: 'sendFile',
    })
  },

};
</script>

<style lang="scss" scoped> 
  @import "../scss/components/CommentForm.scss";
</style>
