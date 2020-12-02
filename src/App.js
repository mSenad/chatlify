import React from "react";
import "./App.css";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState, userAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

import SignIn from "./Components/SignIn";
import ChatRoom from "./Components/ChatRoom";
import SignOut from "./Components/SignOut";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE,
  projectId: process.env.REACT_APP_PROJECT,
  storageBucket: process.env.REACT_APP_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER,
  appId: process.env.REACT_APP_APP,
  measurementId: process.env.REACT_APP_MEASUREMENT,
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo">CHATLIFY</div>
        <SignOut {...{ auth }} />
      </header>

      {user ? <ChatRoom {...{ firestore, auth }} /> : <SignIn />}
    </div>
  );
}

export default App;
