import Vue from "vue";
import Router from "vue-router";

import Cart from "@/components/Cart/Cart.vue";
import Checkout from "@/components/Checkout/Checkout.vue";
import LoginForm from "@/components/LoginForm/LoginForm.vue";
import ProductDetail from "@/components/ProductDetail/ProductDetail.vue";
import ProductAddEdit from "@/components/ProductAddEdit/ProductAddEdit.vue";
import ProductList from "@/components/ProductList/ProductList.vue";
import RegistrationForm from "@/components/RegistrationForm/RegistrationForm.vue";

Vue.use(Router);

export default new Router({
	mode: "history",
	routes: [
		{
			path: "/",
			name: "product-list",
			component: ProductList,
		},
		{
			path: "/product/:id",
			name: "view-product",
			component: ProductDetail,
		},
		{
			path: "/product-add",
			name: "product-add",
			component: ProductAddEdit,
		},
		{
			path: "/cart",
			name: "cart",
			component: Cart,
		},
		{
			path: "/login-form",
			name: "login-form",
			component: LoginForm,
		},
		{
			path: "/register",
			name: "register",
			component: RegistrationForm,
		},
		{
			path: "/checkout",
			name: "checkout",
			component: Checkout,
		},
	],
});
