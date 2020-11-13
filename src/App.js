import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import CreateEvent from "./pages/CreateEvent";
import SignIn from "./pages/SignIn";
import UserEvent from "./pages/UserEvent"


// BEGIN Firebase Import
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// import { useAuthState } from 'react-firebase-hooks/auth';
// import { useCollectionData } from 'react-firebase-hooks/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAmgx9oBP1xBqN0lv2sk5jOGhG2GNRtFV0",
    authDomain: "yhack-7fd15.firebaseapp.com",
    databaseURL: "https://yhack-7fd15.firebaseio.com",
    projectId: "yhack-7fd15",
    storageBucket: "yhack-7fd15.appspot.com",
    messagingSenderId: "78643312201",
    appId: "1:78643312201:web:93a4d99761fcc9c0f73198",
    measurementId: "G-8FT5FPHJRK"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
// END Firebase Import


class App extends Component {
  render(){
    return (
      <BrowserRouter>

          <Switch>
          <Route path="/" component={UserEvent} exact/>
            <Route path="/createevent" component={CreateEvent} exact/>
            <Route path="/signin" component={SignIn} exact/>
            <Route>Page not found</Route>
          </Switch>
      </BrowserRouter>
    );
  }
}

// BEGIN functions

// END FUNCTIONS

export default App;
