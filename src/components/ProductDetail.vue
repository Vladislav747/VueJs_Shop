<template>
  <div class="product-container">
    <div v-if="isLoading" class="lds-dual-ring"></div>
    <div v-if="!isLoading" class="product">
      <div class="header-task">
        <div class="header-title">
          <h3>
            Название товара: {{ task.name }}
          </h3>
        </div>
        <div class="category">
          <span>{{ task.category }}</span>
        </div>
      </div>

      <div class="description">Описание: {{ task.description }}</div>

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
      task: {
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
    this.getTask();
  },

  computed: {
    
  },

  methods: {
    /**
     * Получить задачу
     */
    async getTask() {
      try {
        const response = await this.$http.get("products/" + this.$route.params.id);

        if (response.data === null) {
          //Перенаправление на страницу
          this.$router.push({ name: "task-list" });
          showNoty("Requested task not found.");
          return;
        }

        this.task = response.data;
        this.isLoading = false;
      } catch (error) {
        showNoty("TaskDetail " + error);
      }
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
        await this.$http.delete("products/" + this.task.id);

        this.check.close();
        this.$router.push({ name: "task-list" });

        showNoty("Задача Удалена.", "success");
      } catch (error) {
        this.check.close();
        showNoty(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>

//preloader
@import "../scss/preloader.scss";

#container{
  max-width:940px !important;
}

.product {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
  padding: 1rem;
  width: 60%;
  margin: 1rem auto;
  min-height: 300px;

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

  .description {
    margin-bottom: 1rem;
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

    .image {
      flex: 0 0 50%;
    }

    .image {
      background-position: center;
      background-size: cover;
      min-height: 240px;
    }
  }

  .tag{
    margin:10px 0;
  }

}

.header-task{
  display: flex;
  justify-content: space-between;
}

.vue-input-tag-wrapper {
  border: 0px;
}

footer {
  background-color: #2b87d8;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  display: flex;
  margin-bottom: 1em;
  padding: 1em;

  a {
    color: #fff;
    cursor: pointer;
    line-height: 28px;
    margin-right: 1em;
    text-decoration: none;
  } 
}


</style>
