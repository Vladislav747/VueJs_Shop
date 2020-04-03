<template>
<div class="form-wrapper">
    <form v-if="task" class="form-add-edit">
      <h2 v-if="!isEdit">
        Создать новый товар
      </h2>
      <h2 v-else>
        Редактировать данные о товаре
      </h2> 
      <span class="required">- обязательное поле</span>

      <div class="row">
        <label class="short-label">Имя:</label>
        <input id="task-name" v-model="task.name" class="form__input" type="text" placeholder="Имя"/>
      </div>

      <div class="row">
        <label class="short-label">Категория:</label>
          <select id="task-category"  class="form__input" v-model="task.category">
            <option v-for="type in productTypes" :key="type">{{ type }}</option>
          </select>
      </div>

      <div class="row">
        <label class="short-label" >Описание:</label>
          <textarea id="task-description" class="form__input" v-model="task.description" placeholder="Заполните поле"/>
      </div>

      <div class="row">
        <label class="short-label">Картинка товара:</label>
          <input id="task-image" class="form__input" type="file" ref="file"/>
      </div>

      <div class="row">
        <label class="short-label">Цена товара: </label>
          <input type="number" id="task-price" class="form__input" v-model="task.price" placeholder="Цена товара"/>
      </div>

      <div class="row">
        <label class="short-label">Производитель:</label>
          <select id="task-manufacturer" class="form__input" v-model="task.manufacturer" placeholder="Производитель товара" >
            <option v-for="manufacturer in manufacturerList" :key="manufacturer">{{ manufacturer }}</option>
          </select>
      </div>

      <div class=form-add-edit__controls>
        <button id="save" class="form__btn" type="submit" @click.prevent="validateForm(true)">Сохранить Товар</button>
        <button id="save-new" class="form__btn" @click.prevent="validateForm(false)">Сохранить Товар и Создать Новый Товар</button>
        <button id="cancel" class="form__btn" @click.prevent="cancel()">Отмена</button>
      </div>
    </form>
  </div>
</template>

<script>
import { showNoty, PRODUCT_CATEGORIES } from "../utility";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  name: "ProductAddEdit",

  data() {
    return {
      task: {
        name: "",
        category: "В работе",
        description: "",
        srcImage:"",
        price:"",
        manufacturer:"",
      },
      isLoading:false,
      productTypes: PRODUCT_CATEGORIES,
      manufacturerList:["Bosch", "Samsung"],
    };
  },

  validations: {
    task: {
      name: { required },
      description: { required, max: maxLength(2048) }
    }
  },

  computed: {
    isEdit() {
      return this.$route.params && this.$route.params.id;
    }
  },

  async mounted() {
    if (this.isEdit) {
      await this.getTask();
    }
  },

  methods: {
    /**
     * Получить все задачи с сервера
     *
     */
    async getTask() {
      try {
        const response = await this.$http.get("products/" + this.$route.params.id);

        if (response.data === null) {
          this.$router.push({ name: "task-list" });
          showNoty("Задача не Найдена.");
          return;
        }

        this.task = response.data;
      } catch (error) {
        showNoty(error);
      }
    },

    /**
     * Сохранить задачу
     *
     *@param {string} response - ответ сервера
     *
     */
    async saveTask(isComplete) {
      try {
        const response = this.isEdit
          ? await this.$http.put("products", this.task)
          : await this.$http.post("products", this.task);

        if (this.checkErrors(response) && isComplete) {
          this.$router.push({
            path: this.isEdit ? "/task/" + this.task.id : "/"
          });
          showNoty(
            `Task ${response.data.name} ` +
              (this.isEdit ? "Отредактировано" : "Добавлено"),
            "success"
          );
          return;
        }
      } catch (e) {
        showNoty("Ошибка с добавлением задачи. Попробуйте еще раз!");
        return;
      }

      this.resetForm();
    },

    /**
     * Очистить форму
     *
     */
    resetForm() {
      this.task = {
        name: "",
        category: "В работе",
        description: "",
        tag: "",
        dateOfTask: ""
      };
    },

    /**
     * Отмена выполнения
     *
     */
    cancel() {
      //Вернуться назад
      this.$router.go(-1);
    },

    /**
     * Проверка ошибок возврата с сервера
     * @param {object} response - ответ сервера
     *
     */
    checkErrors(response) {
      if (response.data.message === "success") {
        return true;
      }

      response.data.errors.forEach(error =>
        showNoty(this.transformErrorMessage(error.message))
      );

      return false;
    },

    /**
     * Форматирование ответа сервера
     * @param {string} response - ответ сервера
     *
     */
    transformErrorMessage(message) {
      message = message.replace(".", " ");
      message = message.replace(
        /([A-Z])/,
        (match, p1) => " " + p1.toLowerCase()
      );
      message = message.charAt(0).toUpperCase() + message.slice(1) + ".";

      return message;
    },

    /**
     * Проверяем форму на валидность
     * @param {boolean} isComplete - параметр создания еще одной задачи после создания текущей.
     *
     */
    validateForm(isComplete) {
      this.$v.task.$touch();
      if (this.$v.task.$error) {
        if (this.$v.task.name.$error) {
          showNoty("Имя должно быть заполнено");
        }

        if (this.$v.task.description.$error) {
          showNoty(
            "Описание должно быть заполнено и не может быть более 2048 символов"
          );
        }
        showNoty("Форма не может быть отправлена - ошибки в форме");
      } else {
        this.saveTask(isComplete);
      }
    }
  }
};
</script>

<style lang="scss" scoped>

.form-wrapper{
  margin: 20px auto;
  max-width: 650px;

  .form-add-edit {
    
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
      0 3px 1px -2px rgba(0, 0, 0, 0.2);
    padding: 2rem;
    width: 100%;
    margin: auto;

    textarea#task-description:placeholder-shown,
    input:placeholder-shown{
      background: pink;
    }
      
    h2 {
      margin-bottom: 1rem;

      span {
        border-left: 20px solid pink;
        color: #999;
        font-size: 0.7rem;
        font-weight: normal;
        margin-left: 2rem;
        padding-left: 0.4rem;
      }

      span.required {
        font-size: 1rem;
      }
    }

    [required] {
      border-left: 20px solid pink !important;
    }

    .row {
      border-bottom: 1px solid #ccc;
      line-height: 3rem;
      padding-bottom: 3px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;

      .short-label {
        display: inline-block;
        width: 100%;
        font-weight: 600;
      }

    }

    
    @media screen and (max-width: 725px) {
      .short-label {
        width: 100%;
      }
    }

    @media screen and (max-width: 425px) {
      .short-label {
        .form__input{
          width: 50%;
        }
      }
    }
    
    .form__input {
      background: #fff;
      border: 1px solid #aaa;
      border-radius: 3px;
      height: 2rem;
      font-size: 1rem;
      line-height: 1.5rem;
      outline: 0;
      padding: 2px 7px;
      width: 100%;
    }

    textarea.form__input {
      height: 5rem;
    }

    .preview {
      display: block;

      img {
        vertical-align: top;
      }
    }

    .form-add-edit__controls{
      padding: 10px;
      margin: 0 -5px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .form__btn{
        margin: 0.5rem 5px;
        background-color: #2b87d8;
        border: 1px solid #1c5f9a;
        border-radius: 3px;
        color: #fff;
        cursor: pointer;
        font-size: 1rem;
        outline: 0;
        padding: 15px;
        transition: all 0.2s ease-in-out;
        width: 65%;

        &:hover{
          background-color: darken(#2b87d8, 5%);
        }

        &:active{
          background-color: darken(#2b87d8, 10%);
        }
      }
    }

    @media screen and (max-width: 425px) {
      .form-add-edit__controls {
        display: flex;
        flex-direction: column;

        .form__btn{
          width: 70%;
          margin: 5px auto;
        }
      }
    }
  }

}


</style>
