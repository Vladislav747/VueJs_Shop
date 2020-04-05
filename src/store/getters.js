export default { // = computed properties

  cartCurrency(state){
    return state.currency;
  },

  availableProducts(state, getters) {
    return state.products.filter(product => product.inventory > 0)
  },

  cartProducts(state) {
    console.log(state.cart);
    return state.cart.map(cartItem => {
      const product = state.products.find(product => product.id === cartItem.id)
      return {
        title: product.name,
        category: product.category,
        manufacturer: product.manufacturer,
        price: product.price,
        img: product.srcImage,
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
      console.log(product, "productInStock")
      return product.quantity > 0
    }
  }
}