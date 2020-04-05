export default { // setting and updating the state
  setProducts(state,products) {
    state.products = products
  },

  pushProductToCart(state,product) {
    state.cart.push({
      id: product.id,
      quantity: product.quantity,
    })
    state.cartItems++;
  },

  popProductFromCart(state, productId){
    state.cart = state.cart.filter(item => item.id !== productId);
    state.cartItems--;
  },

  incrementItemQty(state,cartItem) {
    cartItem.quantity++;
    state.cartItems++;
  },
  decrementProductInventory(state,product) {
    product.inventory--
  },
  setCheckoutStatus(state,status) {
    state.checkoutStatus = status
  },
  emptyCart(state) {
    state.cart = []
    state.cartItems = 0
  },
  setHighPrice(state, event) {
    state.highprice = event
  },
  toggleSale(state) {
    state.sale = !state.sale
  },

  setDisplayPerPage(state, quantityPerPage){
    console.log(quantityPerPage, 'setDisplayPerPage mutation')
    state.displayQuantity = quantityPerPage;
  },

  setTotalItems(state, totalQuantity){
    console.log(totalQuantity, 'setTotalItems mutation');
    state.totalProducts = totalQuantity;
  },

  setCurrentPage(state, currentPage){
    console.log(currentPage, 'setCurrentPage mutation');
    state.currentPage = currentPage;
  }
}