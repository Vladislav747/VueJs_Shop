<template>  

  <div v-if="!isLoading && !noTasks" class="filterWrapper bg-light-green">
      <div class="filterIcon bg-light-green" v-on:click="showFilter()">
        <font-awesome-icon icon="filter" class="top-icon icon-size-m"/>
      </div>

    <div  id="filter">
        <p class="filterWrapper-text">Фильтр</p>

        <div class="filter-inner">

            <!-- Фильтр по категориям  -->
            <div class="filter-property">
                <span class="filter-property--title">Категория продуктов:</span>
                <select class="filter-property--body" v-model="filterCategory">
                    <option></option>
                    <option v-for="type in productCategories" :key="type">{{ type }}</option>
                </select>
            </div>

            <!-- Фильтр по Дедлайну  -->
            <div class="filter-property">
                <span class="filter-property--title">Производитель:</span>
                <select class="filter-property--body" v-model="filterManufacturer">
                    <option></option>
                    <option v-for="type in productManufactures" :key="type">{{ type }}</option>
                </select>
            </div>

            <div class="filter-property">
                <span class="filter-property--title">Цена:</span>
                <vue-slider v-model="filterPrice"></vue-slider>
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
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  name: "FilterProducts",

  components:{
    VueSlider
  },

  props:{
    // isLoading: "",
    // noTasks:"",
    products: {
      type: Array,
      default: [],
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
      filteredPrice:[]
      
    };
  },

  watch: {
    filterCategory: function() {

      if (this.filteredManufacturesArray.length === 0) {
        console.log(this.products, "filterCategory");
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

      console.log(this.filteredManufacturesArray, "filterManufacturer");
      
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
      console.log("filterPrice");
      this.$emit('filter_products', this.filteredProducts);
    }
  },

  methods: {

    /**
     * Фильтровать задачу по категории
     * @param {object} product - продукт
     *
     */
    filterProductCategory(product) {
      if (this.filterCategory !== "") {
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
      
      if (this.filterManufacturer !== "" && product.hasOwnProperty('manufacturer') ) {
        console.log(product.manufacturer.toString() === this.filterManufacturer.toString(), "check")
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


  },

};
</script>

<style lang="scss" scoped>

.filterIcon {
  transition: 0.5s linear;
  right: 8px;
  position: fixed;
  top: 15%;
  padding: 10px 14px;
  border-radius: 25%;
  cursor: pointer;
  box-shadow: 0px 0px 5px 1px #c5c5c5;
  svg {
    color: white;
  }
}

#filter {
  margin-bottom: 1em;
  text-align: center;
}

.filterWrapper-text {
  font-size: 20px;
  margin-bottom: 20px;
}

.filterWrapper {
  right: -100%;
  top: 0;
  height: 100%;
  position: fixed;
  width: 300px;
  background-color: #f9f9f9;
  box-shadow: none;
  z-index: 2;
  transition: right 0.2s linear;
  padding: 20px;
  &.show {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.19);
    visibility: visible;
    transition-delay: 0s;
    right: 0px;
  }
  &.show .filterIcon {
    display: none;
  }

    .filter-inner {
      .filter-property {
        margin: 10px 0;
        text-align: left;

        .filter-property--title {
          font-size: 15px;
          color: #333;
          margin-bottom: 5px;
          display: block;
        }

        select {
          &.filter-property--body {
            border-radius: 3px;
            outline: 0;
            padding: 5px;
            width: 100%;
          }
        }
      }
    }

  .clear-result__wrapper{

    text-align: center;
    margin: 20px 0;

    .clear-results__btn{
    outline: none;
    padding: 10px;
    border: 1px solid black;
  
    }
  } 
}

@media screen and (max-width: 800px) {
  #filter {
    select {
      width: 40%;
    }
  }

  .card:nth-child(3n) {
    margin-right: 1em;
  }

  .card:nth-child(2n) {
    margin-right: 0;
  }
}

@media screen and (max-width: 550px) {
  #filter {
    select {
      width: 60%;
    }
  }
}

</style>
