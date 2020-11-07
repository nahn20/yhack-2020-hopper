import React, { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import CreateEvent from "./pages/CreateEvent"
import SignIn from "./pages/SignIn"

class App extends Component {
  render(){
    return (
      <BrowserRouter>

          <Switch>
            <Route path="/" exact>Home</Route>
            <Route path="/signin" exact>SignIn</Route>
            <Route>Page not found</Route>
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
