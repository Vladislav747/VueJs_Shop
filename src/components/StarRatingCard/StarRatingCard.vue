<template>
    <div class="star-rating__wrapper">
       <div class="star-rating">
            <label 
                class="star-rating__star" 
                v-for="rating in ratings" 
				v-bind:key="rating"
                :class="{'is-selected': ((value_stars >= rating) && value_stars != null), 'is-disabled': disabled}" 
                v-on:click="set(rating)" 
                v-on:mouseover="star_over(rating)" 
                v-on:mouseout="star_out">
                <input 
                    class="star-rating star-rating__checkbox" 
                    type="radio" 
                    :value="rating" 
                    :name="name"
                    v-model="value_stars"
                    :disabled="disabled"
                >★</label>
        </div>
    </div>
</template>

<script>

export default {
    name: "StarRatingCard",

    props: {
		value: {
			type: Number,
			default: "",
		},
        disabled: {
			type: Boolean,
			default: false,
		},
        name: {
			type: String,
			default: "",
		},
    },

    data() {
        return {
            temp_value: null,
            ratings: [1, 2, 3, 4, 5],
            value_stars: 0,
        };
    },

    created(){
        this.value_stars = this.value;
    },

    
    methods: {
        /*
        * Behaviour of the stars on mouseover.
        */
        star_over: function(index) {
            var self = this;

            if (!this.disabled) {
                this.temp_value = this.value_stars;
                return this.value_stars = index;
            }

        },

        /*
        * Behaviour of the stars on mouseout.
        */
        star_out: function() {
            if (!this.disabled) {
                return this.value_stars = this.temp_value;
            }
        },

        /*
        * Set the rating.
        */
        set: function(value) {

            if (!this.disabled) {
                this.temp_value = value;
                return this.value_stars = value;
            }

            this.$emit('star_rating', value);
        }
    }
}
</script>

<style lang="scss" scoped> 
@import "./StarRatingCard.scss";

</style>
