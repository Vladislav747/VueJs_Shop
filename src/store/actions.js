import firebase from "firebase/app";
// import 'firebase/storage';
import {baseURLDevelopment, baseURLProduction} from '../config/clientConfigs.js';

export default { // actions = mehtods

   fetchProducts(context) {
       fetch(baseURLProduction + 'products',
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

    //clearOldResults - хочу чтобы перегенировался поиск несмотря на наличие фильтрованых элементов
    fetchProductsPagination(context, clearOldResults){
      console.log("fetchProductsPagination");
      //Если данные фильтруются по названию, 
      // категории, цене или другим свойствам то используем их

      var products = context.state.products;
      var filteredProducts = context.state.filteredItems;
      var currentPage = context.state.currentPage;
      var displayPerPage = context.state.displayQuantity;
      var totalProducts = context.state.totalProducts;
      var startIndex, endIndex;

      if (currentPage > 1){
        startIndex = (currentPage-1) * displayPerPage;
        endIndex = Math.min(startIndex + displayPerPage, totalProducts + 1);
      } else{
        startIndex = 0;
        endIndex = displayPerPage;
      }

      var currentListProducts = [];

      if(filteredProducts.length > 0){
          currentListProducts = filteredProducts.slice(startIndex, endIndex);
      }else{
          currentListProducts = products.slice(startIndex, endIndex); 
      }
      
      context.commit("setCurrentListProducts", currentListProducts);

    },


  addProductToCart(context, product) {

    var productMod = product.product;
    productMod.quantity = product.quantity;

    if(context.getters.productInStock(productMod)){
      const cartItem  = context.state.cart.find(item => item.id === productMod.id)
      if(!cartItem) {
        context.commit('pushProductToCart', productMod)
      }
      else {
        context.commit('pushProductToCart', productMod)
      }
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

    context.dispatch('fetchProductsPagination');
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


  cleanCart(context){
    context.commit('emptyCart');
  },

  async sendFile(file){
    await firebase.storage().ref().put(file).then(() => {
      console.log('Uploaded a blob or file')
    }).catch((e) => {console.log(e);})
  },

  fetchReviews(context, product_id){

    const db = firebase.firestore();

    const productCollection = db.collection('product_comments')

      
      productCollection.where("product_id", "==", this.product_id)
      .get().then((docs)=>{

        var reviews = [];

        docs.forEach(function (doc) {
          var reviewItem = doc.data(); 
          console.log(reviewItem); 
          reviews.push(reviewItem)
        })
        console.log( reviews, "Check"); 
      }).then((res) => {
        
        console.log(res, "")
      })
         
      // reviews = reviews;
      if(_this.reviews.length > 0){
        _this.getAverageRating(_this.reviews);
      }
      
  },

  addSelectedItem(context, product) {
    context.commit('pushSelectedToCart',product);
  },

  deleteSelectedItem(context, productId) {
    console.log("deleteSelectedItem VUEX");
    const selectedItem  = context.state.selectedItems.find(item => item.id === productId);
    if(selectedItem) {
      context.commit('popSelectedFromCart',productId);
    }
    else {
      console.log("Нет такого товара среди выделенных " + productId);
    }

    
  },

  addFilterProducts(context, filterProducts){
    console.log("filterProducts VUEX");
    context.commit('addFilteredProducts', filterProducts);

    context.dispatch('fetchProductsPagination');

  },

  chooseCategory(context, category){

    var products = context.state.products;
    var filterProducts = products.filter(element => element.category == category);

    context.commit('addFilteredProducts', filterProducts);

    context.dispatch('fetchProductsPagination');
  },

  filterManufacturerAction(context, manufacturer){
    var products = context.state.products;
    var filterProducts = products.filter(element => element.manufacturer == manufacturer);

    context.commit('addFilteredProducts', filterProducts);

    context.dispatch('fetchProductsPagination');
  },

  filterSaleAction(context, sale){
    var products = context.state.products;
    var filterProducts = products.filter(element => element.sale == true);

    context.commit('addFilteredProducts', filterProducts);

    context.dispatch('fetchProductsPagination');
  },

  filterStockAction(context){
    var products = context.state.products;
    var filterProducts = products.filter(element => element.stock > 0);

    context.commit('addFilteredProducts', filterProducts);

    context.dispatch('fetchProductsPagination');
  },

  filterPriceAction(context, highprice){
    var products = context.state.products;
    var filterProducts = products.filter(element => element.price <= highprice);

    context.commit('addFilteredProducts', filterProducts);
    context.dispatch('fetchProductsPagination');
  },


  sortItemsAction(context, sortProperty, reverseOrder){

    var products = context.state.products;

    function sortPrice(a, b){
      return a.price - b.price;
    }
    function sortPriceReverse(a, b){
        return b.price - a.price;
    }

    function sortRating(a, b){
      return a.rating - b.rating;
    }

    function sortRatingReverse(a, b){
      return b.rating - a.rating;
    }

    function sortName(a, b){
      return a.name - b.name;
    }


    function sortNameReverse(a, b){
      return a.name - b.name;
    }

    function sortManufacturer(a, b){
      return b.manufacturer - a.manufacturer;
    }

    function sortManufacturerReverse(a, b){
      return a.manufacturer - b.manufacturer;
    }




    switch(sortProperty){
      
      case 'price':
        if(reverseOrder){
          products.sort(sortPrice).reverse();
        }else{
          products.sort(sortPrice);
        }

      break;

      case 'rating':
        if(reverseOrder){
          products.sort(sortRating).reverse();
        }else{
          products.sort(sortRating);
        }

      break;

      case 'name':
        if(reverseOrder){
          products.sort(sortName).reverse();
        }else{
          products.sort(sortName);
        }
      break;

      case 'manufacturer':
        if(reverseOrder){
          products.sort(sortManufacturer).reverse();
        }else{
          products.sort(sortManufacturer);
        }
      break;

      default:
      break; 

    }

    context.commit('addFilteredProducts', products);
    context.dispatch('fetchProductsPagination');
    

  },
}