let firebaseConfig = {
    apiKey: "AIzaSyDCeglJUlep8sB6gM5pJKMpeoG6UwW1BQ4",
    authDomain: "blog-604ca.firebaseapp.com",
    projectId: "blog-604ca",
    storageBucket: "blog-604ca.appspot.com",
    messagingSenderId: "1080205220666",
    appId: "1:1080205220666:web:cc0e22d79db89ba9738e03"
  };

  
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let auth = firebase.auth();