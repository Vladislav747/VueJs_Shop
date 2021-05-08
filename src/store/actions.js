import firebase from "firebase/app";
import {
	baseURLDevelopment,
	baseURLProduction,
} from "../config/clientConfigs.js";

const productsUrl =
	process.env.NODE_ENV == "development"
		? baseURLDevelopment
		: baseURLProduction;

export default {
	/**
	 * Получить данные с сервера о товарах
	 * @param {*} context
	 */
	fetchProducts(context) {
		fetch(productsUrl + "products", {
			method: "GET",
			mode: "cors",
		})
			.then(products => {
				return products.text();
			})
			.then(res => {
				const productResult = JSON.parse(res);
				context.commit("setProducts", productResult);
				context.commit("addDefaultProducts1", productResult);
				context.commit("setTotalItems", productResult.length);
				let totalPages = Math.ceil(
					context.state.totalProducts / context.state.displayQuantity
				);
				context.commit("setTotalPages", totalPages);

				context.dispatch("fetchProductsPagination");
			});
	},

	/**
	 * Получить данные пагинации
	 * @param {*} context
	 */
	fetchProductsPagination(context) {
		//Если данные фильтруются по названию,
		// категории, цене или другим свойствам то используем их

		let products = context.state.products;
		let filteredProducts = context.state.filteredItems;
		let currentPage = context.state.currentPage;
		let displayPerPage = context.state.displayQuantity;
		let totalProducts = context.state.totalProducts;
		let startIndex, endIndex;

		if (currentPage > 1) {
			startIndex = (currentPage - 1) * displayPerPage;
			endIndex = Math.min(startIndex + displayPerPage, totalProducts + 1);
		} else {
			startIndex = 0;
			endIndex = displayPerPage;
		}

		let currentListProducts = [];

		if (filteredProducts.length > 0) {
			currentListProducts = filteredProducts.slice(startIndex, endIndex);
			let totalPages = Math.ceil(
				filteredProducts.length / context.state.displayQuantity
			);
			context.commit("setTotalPages", totalPages);
			context.commit("setTotalItems", filteredProducts.length);
		} else {
			currentListProducts = products.slice(startIndex, endIndex);
			context.commit("setTotalItems", products.length);
			let totalPages = Math.ceil(
				context.state.totalProducts / context.state.displayQuantity
			);
			context.commit("setTotalPages", totalPages);
		}

		context.commit("setCurrentListProducts", currentListProducts);
	},

	/**
	 * Добавить товар на сервер
	 * @param {*} context
	 * @param {*} product
	 */
	addProductToCart(context, product) {
		let productMod = product.product;
		productMod.quantity = product.quantity;

		if (context.getters.productInStock(productMod)) {
			const cartItem = context.state.cart.find(
				item => item.id === productMod.id
			);
			if (!cartItem) {
				context.commit("pushProductToCart", productMod);
			} else {
				context.commit("pushProductToCart", productMod);
			}
		}
	},

	/**
	 * Удалить товар из store
	 * @param {*} context
	 * @param {*} product
	 */
	deleteProductCart(context, product) {
		const cartItem = context.state.cart.find(item => item.id === product.id);

		if (cartItem) {
			context.commit("popProductFromCart", product.id);
		} else {
			console.error("Нет такого товара в корзине " + product.id);
		}
	},

	changeDisplayQuantity(context, displayQuantity) {
		context.commit("setDisplayPerPage", Number.parseInt(displayQuantity));
		const totalPages = Math.ceil(
			context.state.totalProducts / context.state.displayQuantity
		);
		context.commit("setTotalPages", totalPages);

		context.dispatch("fetchProductsPagination");
	},

	changeCurrentPage(context, currentPage) {
		context.commit("setCurrentPage", currentPage);
		context.dispatch("fetchProductsPagination");
	},

	changePrevPage(context) {
		let currentPage = context.state.currentPage;
		currentPage--;
		context.commit("setCurrentPage", currentPage);
		context.dispatch("fetchProductsPagination");
	},

	changeNextPage(context) {
		let currentPage = context.state.currentPage;
		currentPage++;
		context.commit("setCurrentPage", currentPage);
		context.dispatch("fetchProductsPagination");
	},

	cleanCart(context) {
		context.commit("emptyCart");
	},

	fetchReviews(context, product_id) {
		const db = firebase.firestore();
		const productCollection = db.collection("product_comments");

		productCollection
			.where("product_id", "==", this.product_id)
			.get()
			.then(docs => {
				let reviews = [];

				docs.forEach(function(doc) {
					let reviewItem = doc.data();
					reviews.push(reviewItem);
				});
			})
			.then(res => {});

		// reviews = reviews;
		if (_this.reviews.length > 0) {
			_this.getAverageRating(_this.reviews);
		}
	},

	addSelectedItem(context, product) {
		context.commit("pushSelectedToCart", product);
	},

	deleteSelectedItem(context, productId) {
		const selectedItem = context.state.selectedItems.find(
			item => item.id === productId
		);
		if (selectedItem) {
			context.commit("popSelectedFromCart", productId);
		} else {
			console.error("Нет такого товара среди выделенных " + productId);
		}
	},

	addFilterProducts(context, filterProducts) {
		context.commit("setFilteredProducts", filterProducts);
		context.dispatch("fetchProductsPagination");
	},

	chooseCategory(context, category) {
		let products = context.state.products;
		const filterProducts = products.filter(
			element => element.category == category
		);

		context.commit("setFilteredProducts", filterProducts);
		context.commit("setCurrentPage", 1);
		context.dispatch("fetchProductsPagination");
	},

	filterManufacturerAction(context, manufacturer) {
		let products = context.state.products;
		const filterProducts = products.filter(
			element => element.manufacturer == manufacturer
		);

		context.commit("setFilteredProducts", filterProducts);
		context.commit("setCurrentPage", 1);
		context.dispatch("fetchProductsPagination");
	},

	filterSaleAction(context) {
		let products = context.state.products;
		const filterProducts = products.filter(element => element.sale == true);

		context.commit("setFilteredProducts", filterProducts);
		context.commit("setCurrentPage", 1);
		context.dispatch("fetchProductsPagination");
	},

	filterStockAction(context) {
		let products = context.state.products;
		const filterProducts = products.filter(element => element.stock > 0);

		context.commit("setFilteredProducts", filterProducts);
		context.commit("setCurrentPage", 1);
		context.dispatch("fetchProductsPagination");
	},

	filterPriceAction(context, highprice) {
		let products = [...context.state.products];
		const filterProducts = products.filter(function(element) {
			return parseInt(element.price) < parseInt(highprice);
		});

		context.commit("setFilteredProducts", filterProducts);
		context.commit("setCurrentPage", 1);
		context.dispatch("fetchProductsPagination");
	},

	sortItemsAction(context, sortOptions) {
		let products = context.state.products;

		function sortPrice(a, b) {
			return a.price - b.price;
		}

		function sortRating(a, b) {
			return a.rating - b.rating;
		}

		function sortName(a, b) {
			return a.name.localeCompare(b.name);
		}

		function sortManufacturer(a, b) {
			return a.manufacturer.localeCompare(b.manufacturer);
		}

		switch (sortOptions.sortAttr) {
			case "price":
				if (sortOptions.orderAttr) {
					products.sort(sortPrice).reverse();
				} else {
					products.sort(sortPrice);
				}

				break;

			case "rating":
				if (sortOptions.orderAttr) {
					products.sort(sortRating).reverse();
				} else {
					products.sort(sortRating);
				}

				break;

			case "name":
				if (sortOptions.orderAttr) {
					products.sort(sortName).reverse();
				} else {
					products.sort(sortName);
				}
				break;

			case "manufacturer":
				if (sortOptions.orderAttr) {
					products.sort(sortManufacturer).reverse();
				} else {
					products.sort(sortManufacturer);
				}
				break;
		}

		context.commit("setFilteredProducts", products);
		context.dispatch("fetchProductsPagination");
	},

	setOrginalOrder(context) {
		function sortOrder(a, b) {
			return a.order - b.order;
		}

		const productsItems = context.state.products.sort(sortOrder);

		context.commit("setFilteredProducts", []);
		context.commit("setProducts", productsItems);
		context.commit("setCurrentPage", 1);
		context.dispatch("fetchProductsPagination");
	},
};
