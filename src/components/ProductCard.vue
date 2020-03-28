<template>
  <section class="card">
    <div class="card-inner">
      <div class="card-header">
        <div class="card-header--top">
          <div class="card-title" @click="viewTask(task.id)">{{ task.name }}</div>
          <span class="card-sticker top-right" v-bind:class="classObject">Оценка</span>
        </div>
        <div class="image">
          <img :src="require(`@/static/images/${task.srcImage}`)" :alt="`Image of ${task.srcImage}`" :title="`Title of ${task.srcImage}`" />
        </div>
      </div>
     
      <div class="card-footer">
        <div class="description">{{ task.description }}</div>
        <div class="price-block">
          <span class="price">{{task.price}} <span class="currency">руб/шт</span></span>
        </div>

        <div class="counter_block">
          <span class="minus" id="bx_3966226736_2506_quant_down">-</span>
          <input type="text" class="text" id="bx_3966226736_2506_quantity" name="quantity" value="1">
          <span class="plus" id="bx_3966226736_2506_quant_up" data-max="1000">+</span>
        </div>

          <!-- <div class="card-icons"> 
            <a id="edit" @click.prevent="editTask()" class="card-icons--link">
              <font-awesome-icon icon="edit" class="top-icon icon-size-xl" alt="Редактировать задачу"/>
            </a>
          </div> -->

        <div class="buy-block">
          <button class="add-to-cart-btn">Купить товар</button>
        </div>
        
      </div>
        
    </div>
  </section>
</template>

<script>
import Noty from "noty";
import { showNoty } from "../utility";

export default {
  name: "ProductCard",
  props: {
    task: {
      type: Object,
      default: () => {
        return {
          name: "",
          category: "",
          description: "",
          price:"",
          currency:"",
          srcImage:"",
        };
      }
    }
  },

  data() {
    return {
      blackTheme: false,
    };
  },

  computed: {

  classObject: function () {
    var className;

    switch(this.task.category){

      case 'Просрочено':
        className = 'category_sticker expired_sticker';
        break;
      case 'В работе':
        className = 'category_sticker inwork_sticker';
        break;
      case 'Сделано':
        className = 'category_sticker ready_sticker';
        break;
      default:
        className = 'category_sticker';
        break;
    }
      return className
    }
  
},

  methods: {
    /**
     * Переход на детальное отображение задачи
     * @param {number} id - id задачи
     *
     */
    viewTask(id) {
      this.$router.push({ name: "view-product", params: { id } });
    },

    /**
     * Отредактировать задачу
     */
    editTask() {
      this.$router.push({ name: "task-edit", params: { id: this.task.id } });
    },

    /**
     * Отображение оповещение задачи
     */
    deleteTask() {
      this.check = new Noty({
        text: "Удаление задачи нельзя будет отменить.<br>Вы уверены?",
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
     * Закрыть всплывающее окно
     */
    closeCheck() {
      if (!this.check) {
        return;
      }
      //Если есть экземпляр то закрыть окно
      this.check.close();
    },

    /**
     * Удаление задачи
     */
    async realDelete() {
      try {
        await this.$http.delete("tasks/" + this.task.id);

        this.check.close();
        this.$router.push({ name: "task-list" });

        showNoty("Задача Удалена.", "success");
      } catch (error) {
          this.check.close();
          showNoty(error);
      }
    },

    showImagePath(){
      return ""
    }
  },

  mounted: function() {
      this.$root.$on('changeTheme', this.changeTheme);
  },
};
</script>

<style lang="scss" scoped> 
   
.card {
  margin: 10px;
  width: 30%;
  border-radius: 10px;

  .card-inner {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    border-radius: 10px;
    border: 1px solid #e1e1e1;
    transition: box-shadow 0.2s ease-in-out;

    &:hover {
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    }
  }

  .card-header--top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5%;

    .card-title {
      cursor: pointer;
      font-weight: bold;
      padding-top: 2px;
    }

    .card-sticker {
      color: black;
      float: right;
      font-size: 0.9rem;
      border-radius: 5px;
      padding: 3px 10px 2px;
      text-transform: uppercase;
      border-radius: 2px;
    }
  }

  .price{
    font-weight: 700;
    line-height: 15px;
    white-space: normal;
  }

  .image img{
    width: 100%;
    max-height: 280px;
  }

  .buy-block{
      color: black;
      float: right;
      font-size: 0.9rem;
      border-radius: 5px;
      padding: 3px 10px 2px;
      text-transform: uppercase;
      border-radius: 2px;
    


      .add-to-cart-btn{
        background: #5044ff;
        color: #fff;
        padding: 10px 30px;
        font-size: 13px;
        outline: none;
        border: 1px solid #5044ff;
        border-radius: 1000px;
        transition: all .2s ease-in;
        opacity: 0;

        &:hover{
          opacity: 1;
        }
      }
  }

  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    flex-direction: column;

    .datetimeDeadline {
      font-size: 1rem;
      font-weight: bold;
    }

    .price-block{
      margin: auto;
    }

    .counter_block{
      box-sizing: border-box;
      border: 1px solid #f3f3f5;
      background: #f3f3f5;
      display: inline-block;
      border-radius: 2px;
      

      >span:before{
        display: inline-block;
        content: "";
        width: 24px;
        height: 34px;
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
        line-height: 13px;
        padding: 7px 3px;
      }

      .minus{
        line-height: 40px;
        height: 34px;
        width: 24px;
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
        height: 34px;
        width: 24px;
        display: inline-block;
        cursor: pointer;

        &:before{
          background: url(../assets/plus-solid.svg);
          vertical-align: middle;
        }
      }
      
    }

    .card-icons {
      margin-right: -10px;

      .card-icons--link {
        display: inline-block;
        padding: 0 10px;
        cursor: pointer;
      }
    }    
  }

  .inwork_sticker{
    background-color: #ffd83a;
  }
  .expired_sticker{
    background-color: #ff4f4f;
  }
  .ready_sticker{
    background-color: #6ecc6e;
  }

  .image,
  .spacer {
    background-position: center;
    background-size: cover;
    height: 100%;
    max-width: 100%;
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    text-align: center;
  }

  .description {
    word-wrap: break-word;
    margin-top: 15px;
  }

  .tag {
    border: #eee 2px;
    border-radius: 25px;
    background: #73ad21;
    padding: 20px;
    width: 200px;
    height: 70px;
  }

  .vue-input-tag-wrapper {
    border: 0px;
  }
}

@media screen and (max-width: 550px) {

  .card {
    flex: 0 0 100%;
    padding: 5%;

    .description {
      word-wrap: break-word;
      width: 250px;
    }
  }
}

@media screen and (max-width: 800px) {
  .card {
    flex: 0 0 calc(50% - calc(1rem * 0.55));
  }
 
}
</style>
