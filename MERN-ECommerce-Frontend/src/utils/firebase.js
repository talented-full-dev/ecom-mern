import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// firebase config
const config = {
  apiKey: "AIzaSyA9P25x0W_fWTUUKar5nXhel63tO1-LE68",
  authDomain: "ecommerce-76b9b.firebaseapp.com",
  projectId: "ecommerce-76b9b",
  storageBucket: "ecommerce-76b9b.appspot.com",
  messagingSenderId: "77133390918",
  appId: "1:77133390918:web:653e0901b41a640faed647",
  measurementId: "G-46BK8HM5JS",
};
// initialize firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
// export
// export default firebase;
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
