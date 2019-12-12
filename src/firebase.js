import firebase from 'firebase' // TODO: only what we need

var firebaseConfig = {
    apiKey: "AIzaSyDJaEs4eoBFoW0cq85KN76TN7V8Kx3-NFE",
    authDomain: "grading-calculator.firebaseapp.com",
    databaseURL: "https://grading-calculator.firebaseio.com",
    projectId: "grading-calculator",
    storageBucket: "grading-calculator.appspot.com",
    messagingSenderId: "260554503056",
    appId: "1:260554503056:web:6bd82cff152e1cba01b915",
    measurementId: "G-8HNG9ELHY5"
  };

// Initialize Firebase
var defaultApp = firebase.initializeApp(firebaseConfig);
export default firebase;
