<template>  
  <div 
    v-if="!isLoading && !noProducts" 
    class="filterWrapper element-light-green">
      <div 
        class="filterIcon element-light-green" 
        @click="showFilter">

        <font-awesome-icon icon="filter" class="top-icon icon-size-m"/>
      </div>

    <div  id="filter">
        <p class="filterWrapper-text">Фильтр</p>

        <div class="filter-inner">

            <!-- Фильтр по Производителю  -->
            <div class="filter-property">
                <span class="filter-property--title">Производитель:</span>
                <select 
                    class="filter-property--body" 
                    @change="filterManufacturer($event.target.value)">
                    <option 
                      v-for="type in productManufactures" 
                      :key="type">{{ type }}</option>
                </select>
            </div>

            <!-- Фильтр по цене  -->
            <div class="filter-property">
                <span class="filter-property--title">Цена: {{priceData}}</span>
                <input 
                  class="slider"
                  id="pricerange"
                  tabindex="0"
                  type="range"
                  :min="min"
                  :max="max"
                  step="0.1"
                  v-model="priceData"
                  @input="updateHighPrice($event.target.value)"
                />
                <span class="min">от {{ min }} руб</span>
                <span class="max">до {{ priceData }} руб</span>
            </div>

            <!-- Фильтр по свойству наличию  -->
            <div class="filter-property stock-property">
              
              <label class="checkbox-control">
              <p class="filter-property--title">В наличии:</p>
              <input 
                type="checkbox"
                v-model="stock"
                @change="updateStock">
              <span class="checkbox-box"></span> 
              </label>

            </div>

             <!-- Фильтр по свойству sale  -->
            <div class="filter-property sale-property">
              
              <label class="checkbox-control">
              <p class="filter-property--title">Товары Sale:</p>
              <input 
                type="checkbox"
                v-model="sale"
                @change="updateSale">
              <span class="checkbox-box"></span> 
              </label>

            </div>
            

            <div class="clear-result__wrapper">
              <button @click="setOrginalOrder" class="clear-results__btn element-black">Сбросить результаты</button>
          </div>

        </div>
    </div>
  </div>
</template>

<script>
import {PRODUCT_MANUFACTURES} from "../utility";
import 'vue-slider-component/theme/default.css'
import {mapActions} from 'vuex'

export default {
  name: "FilterProducts",

  props:{
    products: {
      type: Array,
      default: () => {},
    },
  },
  
  data() {
    return {
      isLoading: false,
      noProducts: false,
      filteredProducts: [],
      filterCategory: "",
      filterPrice:"",
      productManufactures: PRODUCT_MANUFACTURES,
      filteredCategoriesArray: [],
      filteredManufacturesArray: [],
      filteredPrice:[],
      min: 0,
      max: 10000,
      sale: false,
      stock: false,
      priceData: 10000,
    };
  },


  computed:{
    highPrice() {
      return this.$store.state.highprice
    },
    minPrice() {
      return this.$store.state.highprice
    },
    checked() {
      return this.$store.state.sale;
    },


  },

  methods: {

    /**
     * Фильтровать задачу по производителю
     * @param {object} manufacturer - производитель
     *
     */
    filterManufacturer(manufacturer) {
      
      if (manufacturer !== "") {
        this.filterManufacturerAction(manufacturer);
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

    updateSale(){
      if(this.sale){
        this.filterSaleAction();
      }
    },

    updateStock(){
     
      if(this.stock){
        this.filterStockAction();
      }
      
    },
    
    updateHighPrice(value){
        this.filterPriceAction(value);
    },

    ...mapActions({
            'filterManufacturerAction' :  'filterManufacturerAction',
            'filterSaleAction' : 'filterSaleAction',
            'filterStockAction' : 'filterStockAction',
            'filterPriceAction' : 'filterPriceAction',
            'setOrginalOrder' : 'setOrginalOrder',
       })




  },

};
</script>

<style lang="scss" scoped>

@import "../scss/components/FilterProducts.scss";

</style>
