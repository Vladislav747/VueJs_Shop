<template>  
  <div 
    v-if="!isLoading && !noProducts" 
    class="filterWrapper">

		<div 
			class="filterIcon element-light-green" 
			@click="showFilter"
			>

			<font-awesome-icon icon="filter" class="top-icon icon-size-m"/>
		</div>

    <div  id="filter">
			<h2 class="filterWrapper-text">Фильтр</h2>

			<div class="filter-inner">

				<!-- Фильтр по Производителю  -->
				<div class="filter-property brand-property">
					<span class="filter-property--title">Производитель:</span>
                
						<label class="checkbox-control" v-for="type in productManufactures" :key="type">
							<p class="filter-property--title">{{ type }}</p>
							<input 
								type="checkbox"
								@change="filterManufacturer($event.target.value)"
								:value="type">
							<span class="checkbox-box"></span> 
						</label>
				</div>

				<!-- Фильтр по цене  -->
				<div class="filter-property price-property">
					<span class="filter-property--title">Цена: {{priceData}}</span>
					<input 
						class="slider"
						id="pricerange"
						tabindex="0"
						type="range"
						:min="min"
						:max="max"
						step="0.1"
						@change="changeSliderValue($event.target.value)"
						@input="updateHighPrice($event.target.value)"
						v-model="priceData"
					/>
					<div class="slider__borders">
						<span class="min">от {{ min }} руб</span>
						<span class="max">до {{ priceData }} руб</span>
					</div>
                
				</div>

				<!-- Фильтр по свойству наличию и Sale -->
				<div class="filter-property">
					
					<label class="checkbox-control">
						<p class="filter-property--title">В наличии:</p>
						<input 
							type="checkbox"
							v-model="stock"
							@change="updateStock">
						<span class="checkbox-box"></span> 
					</label>

					<label class="checkbox-control">
						<p class="filter-property--title">Товары Sale:</p>
						<input 
							type="checkbox"
							v-model="sale"
							@change="updateSale"
						/>
						<span class="checkbox-box"></span> 
					</label>

				</div>
            

				<div class="clear-result__wrapper">
					<button 
						@click="setOrginalOrder" 
						class="clear-results__btn element-light-green">Сбросить результаты</button>
				</div>

			</div>
    </div>
  </div>
</template>

<script>
import {PRODUCT_MANUFACTURES} from "@/helpers";

import {mapActions} from 'vuex'

export default {
  name: "FilterProducts",

  props:{
    products: {
      type: Array,
      default: () => [],
    },
  },
  
  data() {
    return {
			isLoading: false,
			noProducts: false,
			filteredProducts: [],
			filterCategory: "",
			filterPrice: "",
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
			 * Округлить значение слайдера при изменении
			 * @param {string} manufacturer - производитель
		*/
		changeSliderValue(priceValue){
			this.priceData = Math.round(priceValue)
		},

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

@import "./FilterProducts.scss";

</style>
