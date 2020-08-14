<template>
    <div class="btn-group btn-group-sort display-sort">
        <div class="display-sort__title">
            <p>Сортировать по:</p>
        </div>
        <div 
            class="display-sort__select"
            ref="select_sort"
            v-on:click="showSelectBody"
        >
            <div 
              class="select__header"
              ref="product"
            >
              <span class="select__current">{{sortDefault}}</span>
              <div class="select__icon">
                <img 
                  src='../assets/chevron-down.svg' 
                  alt="Иконка вниз" 
                  class="select__logo"
                >
              </div>
              
            </div>
            
            <div 
              class="select__body"
            >
              <div 
                class="select__item"
                 v-for="type in sortTypes"
                :value="type.value"
                :key="type.value"
                :data_sort="type.data_sort"
                :data_order="type.data_order"
                @click="sortItems($event.target)"
              >{{ type.value }}</div>
              
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex'


export default {
    name: "SortProducts",

    data() {
        return {
            priceOrder: false,
            nameOrder: false,
            manufacturerOrder: false,
            rateOrder: false,
            sortDefault: "Цене",
            sortTypes: [
                {
                    "data_sort": "name",
                    "data_order": "nameOrder",
                    "value": "Наименованию",
                },
                {
                    "data_sort": "price",
                    "data_order": "priceOrder",
                    "value": "Цене",
                },
                {
                    "data_sort": "manufacturer",
                    "data_order": "manufacturerOrder",
                    "value": "Производителю",
                },
            ],
        };
    },

    created(){
    },

    
    methods: {

        showSelectBody(){
            this.$refs.select_sort.classList.toggle('is-active');
        },

       sortItems(value){

            var sortAttr = value.getAttribute('data_sort');
            var orderAttr = "";

            switch (sortAttr) {
                case "price":
                orderAttr = this.priceOrder;
                this.priceOrder = !this.priceOrder;
                break;

                case "name":
                orderAttr = this.nameOrder;
                this.nameOrder = !this.nameOrder;
                break;

                case "manufacturer":
                orderAttr = this.manufacturerOrder;
                this.manufacturerOrder = !this.manufacturerOrder;
                break;

                case "rating":
                orderAttr = this.rateOrder;
                this.rateOrder = !this.rateOrder;
                break;

                default:
                break;
            }

            var sortOptions = {
                sortAttr: sortAttr,
                orderAttr: orderAttr,
            };

            this.sortItemsAction(sortOptions);           

       },

       sortOriginalOrder(){
           this.setOrginalOrder();
       },

       ...mapActions({
           'sortItemsAction' : 'sortItemsAction',
           'setOrginalOrder': 'setOrginalOrder',
       }),
    }
}
</script>

<style lang="scss" scoped> 
@import "../scss/components/SortProducts.scss";

</style>
