<template>
    <div class="pagination__wrapper">
       <div class="pagination">
           <div v-if="hasPrev" class="pagination__left">
               <a href="#" @click="changeCurrentPage(prevPage)">Предыдущая</a>
            </div>
            <div class="pagination__mid">
                <span>{{currentPage}} из {{totalPages}}</span>
            </div>
           <div v-if="hasNext" class="pagination__right">
               <a href="#" @click="changeCurrentPage(nextPage)">Следующая</a>
            </div>
       </div>
    </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'


export default {
    name: "Pagination",

    data() {
        return {
            
        };
    },

    computed: {
        nextPage: function () {
            return this.currentPage + 1
        },
        prevPage: function () {
            return this.currentPage - 1
        },

        hasPrev: function(){
            return this.currentPage > 1;
        },

        hasNext: function(){
            return this.currentPage < this.totalPages;
        },

        ...mapState({
            currentPage: state => state.currentPage,
            displayQuantity: state => state.displayQuantity,

        }),
        ...mapGetters({
            totalPages:'productTotalPages',
        }),
    },
    

    methods: {
       ...mapActions({
            'changeCurrentPage' :  'changeCurrentPage'
       })
       
    }
}
</script>

<style lang="scss" scoped> 
@import "../scss/components/Pagination.scss";

</style>
