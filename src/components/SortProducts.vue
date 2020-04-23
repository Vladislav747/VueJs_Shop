<template>
    <div class="btn-group btn-group-sort" role="group" aria-label="Sort Buttons">
        Сортировать по:&nbsp; 
        <button 
            type="button" 
            class="btn btn-sort" 
            data-sort="original-order"
            @click="sortOriginalOrder()">Сбросить результаты</button>
        <button 
            type="button"  
            class="btn btn-sort"
            data-sort="price"
            :data-order="priceOrder"
            @click="sortItems($event.target)">Цене</button>
        <button 
            type="button" 
            class="btn btn-sort" 
            data-sort="name"
            :data-order="nameOrder"
            @click="sortItems($event.target)">Наименованию</button>
        <button 
            type="button" 
            class="btn btn-sort" 
            data-sort="manufacturer"
            :data-order="manufacturerOrder"
            @click="sortItems($event.target)">Производителю</button>
        <button 
            type="button" 
            class="btn btn-sort" 
            data-sort="rating"
            :data-order="rateOrder"
            @click="sortItems($event.target)">Оценке</button>
      </div>
</template>

<script>
import {mapActions} from 'vuex'


export default {
    name: "SortProducts",
    props: {
    },

    data() {
        return {
            priceOrder: false,
            nameOrder: false,
            manufacturerOrder: false,
            rateOrder: false,
        };
    },

    created(){
    },

    
    methods: {
       sortItems(value){

            var sortAttr = value.getAttribute('data-sort');
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
