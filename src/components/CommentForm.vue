<template>
    <div class="reviews-container">
      <div class="reviews">
        <div class="reviews__title">
          <h4>Отзывы:</h4>
        </div>
        <div class="reviews__text">
          <p>Заглушка отзывы</p>
        </div>
      </div>
      <form @submit.prevent="onUpload">
        <h4>Оставить новый отзыв</h4>
        <label for="commentText">Текст комментария</label>
        <textarea 
            name="comment" 
            id="commentText" 
            cols="30" 
            rows="10"></textarea>
      </form>
    </div>
</template>

<script>
import Noty from "noty";
import { showNoty } from "../utility";
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
    name: "CommentForm",

    data(){
      return {

      }
    },

     computed: {
        ...mapGetters({
    }),
    ...mapState({
      
    })
  },


    methods: {
      
  },

};
</script>

<style lang="scss" scoped> 
  @import "../scss/components/CommentForm.scss";
</style>
