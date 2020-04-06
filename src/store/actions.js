import shop from '@/api/shop'

export default { // actions = mehtods

   fetchProducts(context) {
       fetch("http://localhost:8080/products",
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
        
      })
    },

    fetchProductsPagination(context){
      console.log("fetchProductsPagination");

      var products = context.state.products;

      //context.commit('setTotalPages', totalPages);

    },


  addProductToCart(context, product) {

    console.log("addProductToCart");

    console.log(product.product, "product")
    console.log(product.quantity, "quantity")


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
    console.log(totalPages, "totalPages changeDisplayQuantity");
    context.commit('setTotalPages', totalPages);
  },

  changeCurrentPage(context, currentPage)
  {
    console.log(currentPage, "currentPage changeCurrentPage");
    context.commit('setCurrentPage', currentPage);
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