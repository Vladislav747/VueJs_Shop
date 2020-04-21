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
            data-order=true
            @click="sortItems($event.target)">Цене</button>
        <button 
            type="button" 
            class="btn btn-sort" 
            data-sort="name"
            @click="sortItems($event.target)">Наименованию</button>
        <button 
            type="button" 
            class="btn btn-sort" 
            data-sort="manufacturer"
            @click="sortItems($event.target)">Производителю</button>
        <button 
            type="button" 
            class="btn btn-sort" 
            data-sort="rating"
            @click="sortItems($event.target)">Оценке</button>
      </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'


export default {
    name: "SortProducts",
    props: {
    },

    data() {
        return {
           
        };
    },

    created(){
    },

    
    methods: {
       sortItems(value){
           console.log(value.getAttribute('data-sort'), "sortItems")
           console.log("sortItems");

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
