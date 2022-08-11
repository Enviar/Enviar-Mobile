import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCbNIOQecVT7wzHH3donNjd3XrSlYt4_WM",
    authDomain: "uploading-file-60deb.firebaseapp.com",
    projectId: "uploading-file-60deb",
    storageBucket: "uploading-file-60deb.appspot.com",
    messagingSenderId: "435975258634",
    appId: "1:435975258634:web:7783f548ca9350c01f95f3"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export { firebase }