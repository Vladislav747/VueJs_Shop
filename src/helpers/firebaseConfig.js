import firebase from "firebase";
import "firebase/database";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCN7IH8XsmkF49HtcN8PA_7FxPx3KNmit0",
	authDomain: "users-napoleon-it.firebaseapp.com",
	databaseURL: "https://users-napoleon-it.firebaseio.com",
	projectId: "users-napoleon-it",
	storageBucket: "users-napoleon-it.appspot.com",
	messagingSenderId: "594737634380",
	appId: "1:594737634380:web:8e05c384009733afcbe8e9",
	measurementId: "G-R4SZ0K0DG1",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//firebase utils
const db = firebase.firestore();

// firebase collections
const usersCollection = db.collection("users");
const commentsCollection = db.collection("product_comments");

export { db, usersCollection, commentsCollection };
