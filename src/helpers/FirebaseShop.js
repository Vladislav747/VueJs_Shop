import firebase from "firebase/app";

class FirebaseShop {
	// constructor() {
	//     this.db = firebase.firestore();
	//     this.usersCollection = this.db.collection('users');
	//     this.commentsCollection = this.db.collection('product_comments');
	// }
	// userBoughtGoods(localLogin) {
	//     var goods = [];
	//     this.usersCollection.where("login", "==", localLogin)
	//     .get().then((foundLogin)=>{
	//         foundLogin.docs.forEach(function (doc) {
	//         var user = doc.data();
	//          goods.push(user)
	//         })
	//         if(goods.length > 0){
	//             return goods;
	//         }
	//     })
	// }
	// insertUsertoDatabase(user, collectionName){
	//     const db = firebase.firestore();
	//     const collection = db.collection(collectionName);
	//     collection.doc('user_'+ user.seed).set({
	//         id_user: 'user_'+ user.seed,
	//         login: user.login,
	//         password: user.password,
	//         date_registered: user.date,
	//     }).then(() =>{
	// 		var loginedLocal = localStorage.getItem("isLogined");
	//         if(!loginedLocal){
	//             localStorage.setItem("isLogined", "true");
	//             localStorage.setItem("userLogin", user.login);
	//         }
	//     })
	// },
}

export default FirebaseShop;
