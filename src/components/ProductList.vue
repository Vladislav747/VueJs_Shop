<template>
  <div class="productList max-width-block">
    
    <filter-products />

    <!-- Если есть isLoading то ставим Loader -->
    <div v-if="isLoading" class="loading">Загружаю товары</div>
    <div v-if="noTasks" class="no-tasks">
      <h3>Товары не найдены</h3>Нажмите вверху на панели Добавить Новый Товар
    </div>

    <div class="products">
      <product-card v-for="product in filteredProducts" :key="product._id" :product="product"/>
    </div>
  </div>  
</template>

<script>
import { showNoty, PRODUCT_CATEGORIES, DEADLINE_TYPES } from "../utility";
import ProductCard from "./ProductCard.vue";
import FilterProducts from "./FilterProducts.vue";

export default {
  name: "ProductList",

  components: {
    ProductCard,
    FilterProducts
  },

  data() {
    return {
      isLoading: true,
      products: [],
      filteredProducts: [],
      filterCategory: "",
      filterDateDeadline: "",
      taskTypes: PRODUCT_CATEGORIES,
      deadlineTypes: DEADLINE_TYPES,
      filteredTasksTime: [],
      filteredTasksDeadline: []
    };
  },

  computed: {
    noTasks() {
      return (
        this.isLoading === false && (this.tasks && this.tasks.length === 0)
      );
    }
  },

  watch: {
    filterCategory: function() {
      if (this.filteredTasksDeadline.length === 0) {
        this.filteredTasksTime = this.tasks.filter(this.filterTask);
      } else {
        this.filteredTasksTime = this.filteredTasksDeadline.filter(
          this.filterTask
        );
      }
      this.filteredProducts = this.filteredTasksTime;
    },

    filterDateDeadline: function() {
      if (this.filteredTasksTime.length === 0) {
        this.filteredTasksDeadline = this.tasks.filter(this.filterTaskDeadline);
      } else {
        this.filteredTasksDeadline = this.filteredTasksTime.filter(
          this.filterTaskDeadline
        );
      }
      this.filteredProducts = this.filteredTasksDeadline;
    }
  },

  mounted() {
    this.getTasks();
  },

  methods: {
    /**
     * Получить задачи
     */
    async getTasks() {
      try {
        const response = await this.$http.get("products");
        this.products = response.data;
        this.$emit("remove", this.products);
        this.$emit("get-products", this.products);
        //Создается копия массива
        this.filteredProducts = this.products.slice();
      } catch (error) {
        showNoty("Ошибка вывода списка товаров  " + error);
      }

      this.$parent.$children[0].products = this.filteredProducts;
      this.isLoading = false;
    },

    /**
   * Переход на добавление продукта
   * @param {object} product - объект текущей задачи
   *
   */
    addTask() {
      this.$router.push("product-add");
    }

  },

  
};
</script>

<style lang="scss" scoped>

.productList {
  z-index: 1;

  .products {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -16px;
    padding: 16px 0;
  }

  .no-tasks {
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12),
      0 3px 1px -2px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    text-align: center;
  }

  .loading {
    text-align: center;
  }
}



@media screen and (max-width: 800px) {

  .card:nth-child(3n) {
    margin-right: 1em;
  }

  .card:nth-child(2n) {
    margin-right: 0;
  }
}

@media screen and (max-width: 768px){
   .products{
        justify-content: center;

  }
}

</style>
