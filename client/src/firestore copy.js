import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCz4lMT5Bb03WggZhJ_No2Tx9UGvPxP4dU",
    authDomain: "give-together.firebaseapp.com",
    databaseURL: "https://give-together.firebaseio.com",
    projectId: "give-together",
    storageBucket: "give-together.appspot.com",
    messagingSenderId: "737331369507",
    appId: "1:737331369507:web:421c702459e63fae03c396",
    measurementId: "G-XKQCE826NL"
};

firebase.initializeApp(firebaseConfig);
export default firebase;