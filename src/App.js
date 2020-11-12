import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import CreateEvent from "./pages/CreateEvent";
import SignIn from "./pages/SignIn";
import Test from "./pages/Test"

class App extends Component {
  render(){
    return (
      <BrowserRouter>

          <Switch>
          <Route path="/" component={Test} exact/>
            <Route path="/createevent" component={CreateEvent} exact/>
            <Route path="/signin" component={SignIn} exact/>
            <Route>Page not found</Route>
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
