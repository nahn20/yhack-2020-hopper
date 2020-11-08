import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import CreateEvent from "./pages/CreateEvent.jsx"
import SignIn from "./pages/SignIn"

class App extends Component {
  render(){
    return (
      <BrowserRouter>

          <Switch>
            <Route path="/" component={CreateEvent} exact/>
            <Route path="/signin" component={SignIn} exact/>
            <Route>Page not found</Route>
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
