import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
