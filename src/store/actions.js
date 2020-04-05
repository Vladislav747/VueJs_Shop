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
      })
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
        context.commit('pushProductToCart',productMod.id)
      }
      else {
        context.commit('incrementItemQty',cartItem)
      }

      context.commit('decrementProductInventory',productMod)

    }
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