import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAXsbirFs8-vdRRpSYISyMuA1TEIyl2HGs",
    authDomain: "lapela-1672c.firebaseapp.com",
    projectId: "lapela-1672c",
    storageBucket: "lapela-1672c.appspot.com",
    messagingSenderId: "849911378965",
    appId: "1:849911378965:web:6a24e6bd10775194634a1c"
  };

  //init

  firebase.initializeApp(firebaseConfig)

  //init service

  const projectFirestore = firebase.firestore()

  const projectAuth = firebase.auth()

  //creates timestamp data property (unique to firebase)
  const timestamp = firebase.firestore.Timestamp

  export {projectFirestore, projectAuth, timestamp}

  