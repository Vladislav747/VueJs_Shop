<template>
 <div class="reviews-container">
  <div class="reviews">
   <ul v-if="this.reviews.length > 0">
    <h3>Отзывы о товаре</h3>
    <li class="review" v-for="review in reviews" :key="review.id">
     <div class="reviews__title">
      <div class="review__author">
       <p>{{ review.autor_login }}</p>
      </div>
      <div class="review__date">
       <p>{{ review.date }}</p>
      </div>
     </div>
     <div class="reviews__rating">
      <p class="rating-title">Оценка товара</p>
      <star-rating-card :value="review.rating" :disabled="true" />
     </div>
     <div class="reviews__text">
      <p class="reviews-title">Комментарий</p>
      <p>{{ review.text }}</p>
     </div>
    </li>
   </ul>
   <div class="no-reviews" v-else>
    <p>Нет отзывов</p>
   </div>
  </div>

  <form class="form-review" v-if="userLogged" @submit.prevent="onUpload">
   <h4>Оставить новый отзыв</h4>
   <div class="form-header">
    <div class="form-profile">
     Пользователь
     {{ profile_autor }}
    </div>
    <div class="form-rating">
     Оцените этот товар
     <star-rating-card
      v-model="product_rating"
      v-on:star_rating="rateProduct"
     />
    </div>
   </div>
   <div class="form-body">
    <input
     type="text"
     class="form-title"
     v-model="product_review_title"
     placeholder="Заголовок отзыва"
    />
    <span class="textarea-wrapper">
     <textarea
      v-model="product_comment"
      placeholder="Комментарий о товаре"
      class="textarea-control"
      maxlength="20000"
      name="comment"
      cols="10"
      rows="8"
     />
    </span>

    <div class="form-actions">
     <button
      type="submit"
      class="btn-primary form-btn"
      @click.prevent="createReview"
     >
      Отправить
     </button>
     <button type="button" class="btn-primary form-btn" @click.prevent="cancel">
      Отменить
     </button>
    </div>
   </div>
  </form>
  <div class="no-form" v-else>
   <h4>Для того чтобы оставить отзыв вам нужно зарегистрироваться</h4>
  </div>
 </div>
</template>

<script>
import { mapActions } from "vuex";

import StarRatingCard from "@/components/StarRatingCard/StarRatingCard.vue";

import firebase from "firebase/app";
import { generateRandomSeed } from "@/helpers";
import { throttle } from "@/helpers";

export default {
 name: "CommentForm",

 components: {
  StarRatingCard,
 },

 props: {
  product_id: {
   type: String,
   default: "",
  },
  profile_autor: {
   type: String,
   default: "",
  },
  right_leave_review: {
   type: Boolean,
   default: false,
  },
 },

 data() {
  return {
   product_comment: "",
   file: "",
   filetext: "",
   product_review_title: "",
   imageData: null,
   picture: null,
   uploadValue: 0,
   reviews: [],
   product_rating: 0,
  };
 },

 computed: {
  throttleGetReviews: function () {
   const DELAY = 2000;
   throttle(this.getReviews, DELAY);
   return true;
  },

  userLogged: function () {
   const logged = localStorage.getItem("isLogined");
   return logged;
  },
 },

 mounted() {
  this.getReviews();
 },

 methods: {
  handleFileUpload() {
   this.uploadValue = 0;
   this.picture = null;
   this.imageData = event.target.files[0];
  },

  onUpload() {
   this.picture = null;
   const storageRef = firebase
    .storage()
    .ref(`${this.imageData.name}`)
    .put(this.imageData);
   storageRef.on(
    `state_changed`,
    (snapshot) => {
     this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
    (error) => {
     new Error(error.message);
    },
    () => {
     this.uploadValue = 100;
     storageRef.snapshot.ref.getDownloadURL().then((url) => {
      this.picture = url;
     });
    }
   );
  },

  cancel() {
   //TODO: Заглушка доделать!
  },

  rateProduct(id) {
   this.product_rating = id;
  },

  createReview() {
   //Очищаем форму
   document.getElementsByClassName("form-title")[0].value = "";
   document.getElementsByClassName("textarea-control")[0].value = "";

   const db = this.$root.$data.firebase.firestore();
   const id_review = generateRandomSeed();
   const nowDate = new Date().toLocaleString("ru", {
    day: "numeric",
    month: "long",
    year: "numeric",
   });

   db.collection("product_comments").doc(id_review).set({
    id_review: id_review,
    title: this.product_review_title,
    text: this.product_comment,
    product_id: this.product_id,
    rating: this.product_rating,
    autor_login: this.profile_autor,
    date: nowDate,
   });

   //Обновляем отзывы
   this.getReviews();
  },

  async getReviews() {
   const db = this.$root.$data.firebase.firestore();
   this.reviews = [];
   let _this = this;
   const productCollection = db.collection("product_comments");

   await productCollection
    .where("product_id", "==", this.product_id)
    .get()
    .then((docs) => {
     docs.forEach(function (doc) {
      const reviewItem = doc.data();
      _this.reviews.push(reviewItem);
     });
    });

   if (_this.reviews.length > 0) {
    this.getAverageRating(_this.reviews);
   }
  },

  //Получить среднюю оценку по товару
  getAverageRating(reviews) {
   const reviewsRating = reviews.map(this.getRating);

   const ratingTotal = reviewsRating.reduce(this.addRating, 0);

   // Вычисляем и выводим в консоль среднее значение.
   const averageRating = ratingTotal / reviewsRating.length;
   this.$emit("average_rating", averageRating);
  },

  //Выбрать именно rating
  getRating(review) {
   return review.rating;
  },

  addRating(prev, next) {
   return prev + next;
  },

  canUserLeaveRating() {
   return this.right_leave_review == false;
  },

  ...mapActions({
   sendFile: "sendFile",
  }),
 },
};
</script>

<style lang="scss" scoped>
@import "./CommentForm.scss";
</style>
