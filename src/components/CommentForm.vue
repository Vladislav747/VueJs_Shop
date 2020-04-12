<template>
    <div class="reviews-container">
      <div class="reviews" >
        <ul v-if="getReviews">
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
            <div class="reviews__text">
              <p class=reviews-title>Комментарий</p>
              <p>{{review.text}}</p>
            </div>
          </li>
        </ul>
        <div class="no-reviews">
          <p>Нет отзывов</p>
        </div>
      </div>
      <form 
        class="form-review" 
        v-if="ifBought" 
        @submit.prevent="onUpload">


        <h4>Оставить новый отзыв</h4>
        <div class="form-header">
          <div class="form-profile">
            Пользователь
            {{profile_autor}} Заглушка
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
          
          <!-- <input type="file" accept="image/png" ref="file" @change="handleFileUpload" name="myFile" >
          <img class="preview" :src="picture" style="width: 200px">
          <br>
          <progress id="progress" :value="uploadValue" max="100"></progress> -->
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
        reviews:[],
      }
    },

     computed: {
       //TODO: Только если пользователь купил товар - localStorage 
      ifBought(){
                //firebase utils
        // const db = firebase.firestore();

        // // firebase collections
        
        // const commentsCollection = db.collection('product_comments')
        // console.log(commentsCollection, "CommentForm");
        return true;
      },

      getReviews(){

      const db = firebase.firestore();

      var reviews = [];

        db.collection("product_comments").where("product_id", "==", this.product_id)
        .get().then((docs)=>{

          docs.forEach(function (doc) {
            var reviewItem = doc.data();  
            reviews.push(reviewItem)
            return reviews;
          })
        })
           
        this.reviews = reviews;

        //Проверяем что отзывы пришли и если все хорошо загружаем
        if (this.reviews.length > 0){
          return true;
        } else {
          return false;
        }


        
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
      
      ...mapActions({
         sendFile: 'sendFile',
      })
  },

};
</script>

<style lang="scss" scoped> 
  @import "../scss/components/CommentForm.scss";
</style>
