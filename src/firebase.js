import firebase from "firebase/app";
import "firebase/database";
import environment from "./environment";

firebase.initializeApp(environment.firebase);
firebase.analytics();

export default firebase;
