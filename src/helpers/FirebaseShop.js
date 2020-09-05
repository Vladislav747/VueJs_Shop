import firebase from 'firebase/app';

class FirebaseShop {

    constructor() {
        this.db = firebase.firestore();
        this.usersCollection = this.db.collection('users');
        this.commentsCollection = this.db.collection('product_comments');
    
    }

  
    userBoughtGoods(localLogin) {

        var goods = [];
    
        this.usersCollection.where("login", "==", localLogin)
        .get().then((foundLogin)=>{

            foundLogin.docs.forEach(function (doc) {
            var user = doc.data(); 
             goods.push(user)
            })

            if(goods.length > 0){
                return goods;
            }
        })

        
    }
}

export default FirebaseShop;