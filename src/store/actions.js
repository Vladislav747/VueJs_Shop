import shop from '@/api/shop'

export default { // actions = mehtods

   fetchProducts(context) {
       fetch("https://napoleon-shop.herokuapp.com/products",
        {
          method: 'GET',
          mode: "cors"
        }
      ).then(products => {
        var result = products.text();
        return result;
      }).then((res) => {
        var productResult = JSON.parse(res);
        context.commit('setProducts', productResult);
        context.commit('setTotalItems', productResult.length);
        var totalPages = Math.ceil(context.state.totalProducts / context.state.displayQuantity);
        context.commit('setTotalPages', totalPages);

        context.dispatch('fetchProductsPagination');
      })
    },

    fetchProductsPagination(context){
      console.log("fetchProductsPagination");

      var products = context.state.products;
      var currentPage = context.state.currentPage;
      var displayPerPage = context.state.displayQuantity;
      var totalProducts = context.state.totalProducts;
      var startIndex, endIndex;

      if (currentPage > 1){
        startIndex = (currentPage-1) * displayPerPage;
        endIndex = Math.min(startIndex + displayPerPage - 1, totalProducts + 1);
      } else{
        startIndex = 0;
        endIndex = displayPerPage;
      }

      var currentListProducts = products.slice(startIndex, endIndex);
      context.commit("setCurrentListProducts", currentListProducts);

    },


  addProductToCart(context, product) {

    var productMod = product.product;
    productMod.quantity = product.quantity;

    if(context.getters.productInStock(productMod)){
      const cartItem  = context.state.cart.find(item => item.id === productMod.id)
      if(!cartItem) {
        context.commit('pushProductToCart',productMod)
      }
      else {
        //context.commit('incrementItemQty',cartItem)
        context.commit('pushProductToCart',productMod)
      }

      //уменьшить на складе количество товара
      //context.commit('decrementProductInventory',productMod)

    }
  },

  deleteProductCart(context, product) {
    const cartItem  = context.state.cart.find(item => item.id === product.id)
    
    if(cartItem) {
      context.commit('popProductFromCart',product.id);
    }
    else {
      console.log("Нет такого товара в корзине " + product.id);
    }

    
  },

  changeDisplayQuantity(context, displayQuantity){

    context.commit('setDisplayPerPage', Number.parseInt(displayQuantity));
    var totalPages = Math.ceil(context.state.totalProducts / context.state.displayQuantity);
    context.commit('setTotalPages', totalPages);
  },

  changeCurrentPage(context, currentPage){
    
    context.commit('setCurrentPage', currentPage);
    context.dispatch('fetchProductsPagination');

  },

  changePrevPage(context){
    var currentPage = context.state.currentPage;
    currentPage--;
    context.commit('setCurrentPage', currentPage);
    context.dispatch('fetchProductsPagination');
  },

  changeNextPage(context){
    var currentPage = context.state.currentPage;
    currentPage++;
    context.commit('setCurrentPage', currentPage);
    context.dispatch('fetchProductsPagination');
  },



  checkout(context) {
    shop.buyProducts(
      context.state.cart,
      () => {
        context.commit('emptyCart')
        context.commit('setCheckoutStatus','success')
      },
      () => {
        context.commit('setCheckoutStatus','fail')
      }
    )
  },

  sendFile(imageData){
    
  }
}