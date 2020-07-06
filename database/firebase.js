
import * as firebase from 'firebase';
import firestore from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDfNuiQ9z4aKU8zaCjDhaYq6SmFm-G5lZ0",
    authDomain: "invoiceapp-59fb6.firebaseapp.com",
    databaseURL: "https://invoiceapp-59fb6.firebaseio.com",
    projectId: "invoiceapp-59fb6",
    storageBucket: "invoiceapp-59fb6.appspot.com",
    messagingSenderId: "508381362823",
    appId: "1:508381362823:web:973de778b83ea81320d622",
    measurementId: "G-96P75CR5DN"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
firebase.firestore();

export default firebase;