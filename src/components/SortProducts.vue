<template>
    <div class="btn-group btn-group-sort" role="group" aria-label="Sort Buttons">
        Сортировать по:&nbsp; 
        <button 
            type="button" 
            class="btn active btn-sort" 
            data-sort="original-order"
            @click="sortItems($event.target)">Сбросить результаты</button>
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
            console.log(value.getAttribute('data-sort'), "sortItems")
            var sortAttr = value.getAttribute('data-sort');
            var orderAttr = Boolean(value.getAttribute('data-order'));
            value.setAttribute('data-order', !orderAttr);
            console.log(value.getAttribute('data-order'), "sortItems")
            this.sortItemsAction(sortAttr, orderAttr);

       },

       ...mapActions({
           'sortItemsAction' : 'sortItemsAction',
       }),
    }
}
</script>

<style lang="scss" scoped> 
@import "../scss/components/SortProducts.scss";
</style>
