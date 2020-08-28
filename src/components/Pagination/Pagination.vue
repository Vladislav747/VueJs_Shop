<template>
    <div class="pagination__wrapper">
			<div class="page-prev">
				<a href="#" v-bind:class="{ 'disabled': !hasPrev}" @click.prevent="prevPage"></a>
			</div>
           <ul class="pagination">
               
                <li class="page-wrapper" v-for="p in totalPages" :key="p">
                    <button
                        class="btn btn-primary btn-paginate"
                        :class="{'active' : (p == currentPage)}" 
                        @click.prevent="changeCurrentPage(p)">{{p}}
                    </button>
                </li>
               
           </ul>
		    <div class="page-next">
                    <a href="#" v-bind:class="{ 'disabled': !hasNext}" @click.prevent="nextPage"></a>
			</div>
    </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from 'vuex'


export default {
    name: "Pagination",
    computed: {
        
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
            'changeCurrentPage' :  'changeCurrentPage',
            'nextPage' : 'changeNextPage',
            'prevPage' : 'changePrevPage',
       })
    }
}
</script>

<style lang="scss" scoped> 
@import "./Pagination.scss";
</style>
