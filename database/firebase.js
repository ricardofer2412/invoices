
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyBrNNecSwdCNc1qUQ2yy0j0O0nNHXi6oAg",
    authDomain: "invoices-9d0b8.firebaseapp.com",
    databaseURL: "https://invoices-9d0b8.firebaseio.com",
    projectId: "invoices-9d0b8",
    storageBucket: "invoices-9d0b8.appspot.com",
    messagingSenderId: "421803080680",
    appId: "1:421803080680:web:b82d64a7f999e43282025d",
    measurementId: "G-01M4LRMBWR"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;