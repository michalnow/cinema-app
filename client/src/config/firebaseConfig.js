import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyDWdmIxG3RwAMli1s-GhAIib5du0NfyCaw",
  authDomain: "cinemapp-service.firebaseapp.com",
  databaseURL: "https://cinemapp-service.firebaseio.com",
  projectId: "cinemapp-service",
  storageBucket: "cinemapp-service.appspot.com",
  messagingSenderId: "66468469024"
};

firebase.initializeApp(config);

firebase.firestore().settings({ timestampsInSnapshots: true });
export const auth = firebase.auth;
export const provider = new firebase.auth.FacebookAuthProvider();

export default firebase;
