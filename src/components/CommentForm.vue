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
        <form>
            <label for="commentText">Текст комментария</label>
            <textarea name="comment" id="commentText" cols="30" rows="10"></textarea>
        </form>
    </div>
</template>

<script>
import Noty from "noty";
import { showNoty } from "../utility";
import {mapState, mapGetters, mapActions} from 'vuex'

export default {
    name: "CommentForm",

     computed: {
        ...mapGetters({
        products:'cartProducts',
        total:'cartTotal'
    }),
    ...mapState({
      checkoutStatus: 'checkoutStatus'
    })
  },


     methods: {
       /**
     * Отображение оповещение задачи
     */
      deleteProductFromCart() {
        this.check = new Noty({
          text: "Удаление товара нельзя будет отменить.<br>Вы уверены?",
          type: "alert",
          layout: "topCenter",
          buttons: [
            Noty.button("Да", "danger", () => this.realDelete(), {
              id: "delete-yes"
            }),
            Noty.button("Нет", "", () => this.closeCheck(), { id: "delete-no" })
          ]
        });

        this.check.show();
      },

     /**
     * Удаление задачи
     */
    async realDelete() {
      try {
        await this.$http.delete("products/" + this.product.id);

        this.check.close();
        this.$router.push({ name: "product-list" });

        showNoty("Задача Удалена.", "success");
      } catch (error) {
          this.check.close();
          showNoty(error);
      }
    },

  },

};
</script>

<style lang="scss" scoped> 

</style>
