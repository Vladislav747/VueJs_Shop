export default { // = computed properties

  getProducts(state){
    const response = this.$http.get("products");
    var products = response.data;

    state.products = products;

    return state.products;

  },
  // availableProducts(state, getters) {
  //   return state.products.filter(product => product.inventory > 0)
  // },
  cartProducts(state) {
    return state.cart.map(cartItem => {
      const product = state.products.find(product => product.id === cartItem.id)
      return {
        title: product.title,
        price: product.price,
        img: product.img,
        quantity: cartItem.quantity
      }
    })
  },
  cartTotal(state,getters) {
    // let total = 0;
    // getters.cartProducts.forEach(product => {
    //   total = total + product.price * product.quantity
    // })
    // return total;

    return getters.cartProducts.reduce((total,product) => total + product.price * product.quantity, 0)
  },

  productInStock() {
    return(product) => {
      return product.quantity > 0
    }
  }
}