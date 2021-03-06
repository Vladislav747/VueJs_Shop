<template>
	<div class="form-wrapper">
    <form v-if="product" class="form-add-edit">
      <h2>
        Создать новый товар
      </h2> 
      <span class="required">- обязательное поле</span>

      <div class="row">
        <label class="short-label">Имя:</label>
        <input id="product-name" v-model="product.name" class="form__input" type="text" placeholder="Имя"/>
      </div>

      <div class="row">
        <label class="short-label">Категория:</label>
          <select id="product-category"  class="form__input" v-model="product.category">
            <option v-for="type in productTypes" :key="type">{{ type }}</option>
          </select>
      </div>

      <div class="row">
        <label class="short-label" >Описание:</label>
          <textarea id="product-description" class="form__input" v-model="product.description" placeholder="Заполните поле"/>
      </div>

      <div class="row">
        <label class="short-label">Картинка товара:</label>
          <input id="product-image" class="form__input" type="file" ref="file"/>
      </div>

      <div class="row">
        <label class="short-label">Цена товара: </label>
          <input type="number" id="product-price" class="form__input" v-model="product.price" placeholder="Цена товара"/>
      </div>

      <div class="row">
        <label class="short-label">Производитель:</label>
          <select id="product-manufacturer" class="form__input" v-model="product.manufacturer" placeholder="Производитель товара" >
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
import { showNoty,  PRODUCT_CATEGORIES} from "@/helpers";
import { required, maxLength } from "vuelidate/lib/validators";

export default {
	name: "ProductAddEdit",

	data() {
		return {
			product: {
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
		product: {
			name: { required },
			description: { required, max: maxLength(2048) }
		},
	},

	computed: {
		isEdit() {
			return this.$route.params && this.$route.params.id;
		},
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
					this.$router.push({ name: "product-list" });
					showNoty("Товар не найден");
					return;
				}

				this.product = response.data;
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
					? await this.$http.put("products", this.product)
					: await this.$http.post("products", this.product);

				if (this.checkErrors(response) && isComplete) {
					this.$router.push({
						path: this.isEdit ? "/product/" + this.product.id : "/"
					});
					showNoty(
						`Product ${response.data.name} ` +
							(this.isEdit ? "Отредактировано" : "Добавлено"),
						"success"
					);
					return;
				}
			} catch (e) {
				showNoty("Ошибка с добавлением продукта. Попробуйте еще раз!");
				return;
			}

			this.resetForm();
		},

		/**
		 * Очистить форму
		 *
		 */
		resetForm() {
			this.product = {
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
			this.$v.product.$touch();
			if (this.$v.product.$error) {
				if (this.$v.product.name.$error) {
					showNoty("Имя должно быть заполнено");
				}

				if (this.$v.product.description.$error) {
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

@import "./ProductAddEdit.scss";


</style>
