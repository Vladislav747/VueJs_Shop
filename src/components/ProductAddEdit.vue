<template>
  <form v-if="task">
    <h2 v-if="!isEdit">
      Создать новый товар
    </h2>
    <h2 v-else>
      Редактировать данные о товаре
    </h2>

    <span class="required">- обязательное поле</span>

    <div class="row">
      <label class="short-label">
        Имя:
        <input id="task-name" v-model="task.name" class="formEdit-input" type="text" placeholder="Заполните поле"/>
      </label>
    </div>

    <div class="row">
      <label class="short-label">
        Категория:
        <select id="task-category" v-model="task.category" class="formEdit-input">
          <option v-for="type in taskTypes" :key="type">{{ type }}</option>
        </select>
      </label>
    </div>

    <div class="row">
      <label>
        Описание:
        <textarea id="task-description" v-model="task.description" placeholder="Заполните поле"/>
      </label>
    </div>

    <div class="row">
      <label>
        Url картинки товара:
        <input id="task-image" v-model="task.srcImage" placeholder="../../static/images/"/>
      </label>
    </div>

    <div class="row">
      <label>
        Цена товара:
        <input type="number" id="task-price" v-model="task.price" placeholder="Цена товара"/>
      </label>
    </div>

    <div class="row">
      <label>
        Дата Дедлайна:
        <date-picker
          v-model="task.dateOfTask"
          type="datetime"
          lang="en"
          format="YYYY-MM-DD hh:mm:ss"
        ></date-picker>
      </label>
    </div>

    <div class=formEdit-wrapper>
      <button id="save" class="formEdit-button" type="submit" @click.prevent="validateForm(true)">Сохранить Товар</button>
      <button id="save-new" class="formEdit-button" @click.prevent="validateForm(false)">Сохранить Товар и Создать Новый Товар</button>
      <button id="cancel" class="formEdit-button" @click.prevent="cancel()">Отмена</button>
    </div>
  </form>
</template>

<script>
import { showNoty, PRODUCT_CATEGORIES } from "../utility";
import DatePicker from "vue2-datepicker";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
  name: "ProductAddEdit",

  components: {
    DatePicker
  },

  data() {
    return {
      task: {
        name: "",
        category: "В работе",
        description: "",
        srcImage:"",
        price:"",
      },
      isLoading:false,
      taskTypes: PRODUCT_CATEGORIES
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

form {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
    0 3px 1px -2px rgba(0, 0, 0, 0.2);
  padding: 1rem;
  width: 80%;
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
  }

  .short-label {
    display: inline-block;
    width: 49%;
  }

  @media screen and (max-width: 725px) {
    .short-label {
      width: 100%;
    }
  }

  @media screen and (max-width: 425px) {
    .short-label {
      .formEdit-input{
        width: 50%;
      }
    }
  }
  

  input,
  select,
  form textarea {
    background: #fff;
    border: 1px solid #aaa;
    border-radius: 3px;
    height: 2rem;
    font-size: 1rem;
    line-height: 1.5rem;
    max-width: 100%;
    outline: 0;
    padding: 2px 7px;
    width: 48%;
  }

  input:hover,
  select:hover,
  textarea:hover {
    border-color: #777;
  }

  input:active,
  input:focus,
  select:active,
  select:focus,
  textarea:active,
  textarea:focus {
    border-color: #333;
  }

  textarea {
    display: block;
    height: 100px;
    margin-bottom: 1rem;
    width: 100%;
  }

  input[type="text"],
  input[type="number"],
  select {
    float: right;
    margin-right: 1rem;
    margin-top: 9px;
    width: 45%;
  }

   @media screen and (max-width: 725px) {
    input[type="text"],
    input[type="number"],
    select {
      margin-right: 0;
    }
  }


  input[type="text"]#task-tag {
    padding-right: 100px;
  }

  .preview {
    display: block;

    img {
      vertical-align: top;
    }
  }

  button {
    background-color: #2b87d8;
    border: 1px solid #1c5f9a;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 1rem;
    outline: 0;
    padding: 10px;
    transition: all 0.2s ease-in-out;
  }

  button:hover {
    background-color: darken(#2b87d8, 5%);
  }

  button:active {
    background-color: darken(#2b87d8, 10%);
  }

  .formEdit-wrapper{
    padding: 10px;
    margin: 0 -5px;
  }

  @media screen and (max-width: 425px) {
    .formEdit-wrapper {
      display: flex;
      flex-direction: column;
    }
  }

  .formEdit-button{
    margin: 0 5px;
  }

   @media screen and (max-width: 425px) {
    .formEdit-wrapper {
      display: flex;
      flex-direction: column;

    .formEdit-button{
      width: 70%;
      margin: 5px auto;
    }
    }

  }

}
</style>
