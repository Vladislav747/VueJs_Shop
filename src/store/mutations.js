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
    state.sale = !state.sale;
  },

  setDisplayPerPage(state, quantityPerPage){
    state.displayQuantity = quantityPerPage;
  },

  setCurrentPage(state, currentPage){
    state.currentPage = currentPage;
  },

  setTotalPages(state, totalPages){
    state.totalPages = totalPages;
  },

  setTotalItems(state, totalQuantity){
    state.totalProducts = totalQuantity;
  },

  setCurrentListProducts(state, currentListProducts){
    state.currentListProducts = currentListProducts;
  },

  pushSelectedToCart(state,product) {
    state.selectedItems.push({
      id: product.id,
      quantity: product.quantity,
    })
  },

  popSelectedFromCart(state, productId){
    state.selectedItems = state.selectedItems.filter(item => item.id !== productId);
  },

  setFilteredProducts(state, filterProducts){
    state.filteredItems = filterProducts;
  },

  addDefaultProducts1(state, products){
    state.defaultItems = products;
  },

  
}