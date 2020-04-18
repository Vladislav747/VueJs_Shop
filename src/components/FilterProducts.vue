<template>  

  <div 
    v-if="!isLoading && !noTasks" 
    class="filterWrapper bg-light-green">
      <div 
        class="filterIcon bg-light-green" 
        @click="showFilter">

        <font-awesome-icon icon="filter" class="top-icon icon-size-m"/>
      </div>

    <div  id="filter">
        <p class="filterWrapper-text">Фильтр</p>

        <div class="filter-inner">

            <!-- Фильтр по категориям  -->
            <div class="filter-property">
                <span class="filter-property--title">Категория продуктов:</span>
                <select 
                  class="filter-property--body" 
                  v-model="filterCategory">
                    <option></option>
                    <option 
                      v-for="type in productCategories" 
                      :key="type">{{ type }}</option>
                </select>
            </div>

            <!-- Фильтр по Дедлайну  -->
            <div class="filter-property">
                <span class="filter-property--title">Производитель:</span>
                <select class="filter-property--body" v-model="filterManufacturer">
                    <option></option>
                    <option 
                      v-for="type in productManufactures" 
                      :key="type">{{ type }}</option>
                </select>
            </div>

            <!-- Фильтр по цене  -->
            <div class="filter-property">
                <span class="filter-property--title">Цена:</span>
                <!-- <vue-slider v-model="filterPrice"></vue-slider> -->
                <input 
                  class="slider"
                  id="pricerange"
                  tabindex="0"
                  :value="pricerange"
                  type="range"
                  :min="min"
                  :max="max"
                  step="0.1"
                  @input="updateHighPrice($event)"
                />
                <span class="min">${{ min }}</span>
                <span class="max">${{ max }}</span>
            </div>

             <!-- Фильтр по свойству sale  -->
            <div class="filter-property sale-property">
              
              <label class="checkbox-control">
              <p class="filter-property--title">Товары Sale:</p>
              <input 
                type="checkbox"
                v-model="check"
                @change="updateSale">
              <span class="checkbox-box"></span> 
              </label>

            </div>
            

            <div class="clear-result__wrapper">
              <button @click="clearResults()" class="clear-results__btn">Сбросить результаты</button>
          </div>

        </div>
    </div>
  </div>
</template>

<script>
import {PRODUCT_CATEGORIES, PRODUCT_MANUFACTURES} from "../utility";
import 'vue-slider-component/theme/default.css'

export default {
  name: "FilterProducts",

  components:{
    
  },

  props:{
    // isLoading: "",
    // noTasks:"",
    products: {
      type: Array,
      default: () => {},
    },
  },
  
  data() {
    return {
      isLoading: false,
      noTasks: false,
      filteredProducts: [],
      filterCategory: "",
      filterManufacturer: "",
      filterPrice:"",
      productCategories:  PRODUCT_CATEGORIES,
      productManufactures: PRODUCT_MANUFACTURES,
      filteredCategoriesArray: [],
      filteredManufacturesArray: [],
      filteredPrice:[],
      min: 0,
      max: 2000,
      check: this.checked,
    };
  },

  watch: {
    filterCategory: function() {

      if (this.filteredManufacturesArray.length === 0) {
        this.filteredCategoriesArray = this.products.filter(this.filterProductCategory);
      } else {
        this.filteredCategoriesArray = this.filteredManufacturesArray.filter(this.filterProductCategory);
      }
      this.filteredProducts = this.filteredCategoriesArray;

      this.$emit('filter_products', this.filteredProducts);
    },


    filterManufacturer: function() {

      if (this.filteredCategoriesArray.length === 0) {
        this.filteredManufacturesArray = this.products.filter(this.filterProductManufacturer);
      } else {
      
        this.filteredManufacturesArray = this.filteredCategoriesArray.filter(this.filterProductManufacturer);
      }
      this.filteredProducts = this.filteredManufacturesArray;
      
      this.$emit('filter_products', this.filteredProducts);
    },

    filterPrice: function() {
      if (this.filteredCategoriesArray.length === 0) {
        this.filteredTasksDeadline = this.products.filter(this.filterTaskDeadline);
      } else {
        this.filteredTasksDeadline = this.filteredCategoriesArray.filter(
          this.filterTaskDeadline
        );
      }
      this.filteredProducts = this.filteredTasksDeadline;
  
      this.$emit('filter_products', this.filteredProducts);
    }
  },

  computed:{
    pricerange() {
      return this.$store.state.highprice
    },
    checked() {
      return this.$store.state.sale;
    },
  },

  methods: {

    /**
     * Фильтровать задачу по категории
     * @param {object} product - продукт
     *
     */
    filterProductCategory(product) {
      if (this.filterCategory !== "" && product.hasOwnProperty('category')) {
        return product.category.toString() === this.filterCategory.toString();
      } else {
        return true;
      }
    },

    /**
     * Фильтровать задачу по производителю
     * @param {object} product - продукт
     *
     */
    filterProductManufacturer(product) {
      
      if (this.filterManufacturer !== "" && product.hasOwnProperty('manufacturer')) {
        return product.manufacturer.toString() === this.filterManufacturer.toString();
      } else {
        return false;
      }
    },

    /**
     * Фильтровать задачу по цене
     * @param {object} task - объект текущей задачи
     *
     */
    filterTaskDeadline(task) {
      var dateDeadline = new Date(task.dateOfTask).getTime();
      var nowDate = new Date().getTime();

      switch (this.filterPrice) {
        case "Непросроченные Задачи":
          return dateDeadline >= nowDate;

        case "Просроченные Задачи":
          return dateDeadline < nowDate;

        default:
          return true;
      }
    },

    /**
     * Показывать/Скрывать блок фильтра
     */
    showFilter() {
      var divFilter = document.getElementsByClassName("filterWrapper")[0];
      var overlay = this.$root.$data.showOverlay();
      divFilter.style['z-index'] = overlay.index;
      overlay.div.onclick = function(e){
        if(typeof(e.target.remove) == 'function') {
          e.target.remove();
          divFilter.classList.toggle("show");
        }
      }
      divFilter.classList.toggle("show");
    },

     /* Очистить результаты фильтрации */
    clearResults() {
     
      this.$emit('clear_results', this.products);

    },

    updateSale(){
    //Заглушка
    },

    updateHighPrice(){
      //Заглушка
    }


  },

};
</script>

<style lang="scss" scoped>

@import "../scss/components/FilterProducts.scss";

</style>
