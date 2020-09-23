export default {
	// = computed properties

	cartCurrency(state) {
		return state.currency;
	},

	availableProducts(state) {
		return state.products.filter(product => product.inventory > 0);
	},

	productTotalPages(state) {
		return state.totalPages;
	},

	cartProducts(state) {
		return state.cart.map(cartItem => {
			const product = state.products.find(
				product => product.id === cartItem.id
			);
			return {
				id: product.id,
				name: product.name,
				category: product.category,
				manufacturer: product.manufacturer,
				price: product.price,
				srcImage: product.srcImage,
				quantity: cartItem.quantity,
			};
		});
	},

	cartSelected(state) {
		return state.selectedItems.map(cartItem => {
			const product = state.products.find(
				product => product.id === cartItem
			);
			return {
				id: product.id,
				name: product.name,
				category: product.category,
				manufacturer: product.manufacturer,
				price: product.price,
				quantity: cartItem.quantity,
			};
		});
	},

	cartTotal(state, getters) {
		return getters.cartProducts.reduce(
			(total, product) => total + product.price * product.quantity,
			0
		);
	},

	productInStock() {
		return product => {
			return product.quantity > 0;
		};
	},
};
