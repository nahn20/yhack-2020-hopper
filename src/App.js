import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import CreateEvent from "./pages/CreateEvent";
import SignIn from "./pages/SignIn";
import UserEvent from "./pages/UserEvent"
import EventResults from "./pages/EventResults";
import About from "./pages/About";




class App extends Component {
  render(){
    return (
      <BrowserRouter>
          <Switch>
          <Route path="/" component={CreateEvent} exact/>
            <Route path="/event" component={UserEvent} exact/>
            <Route path="/results" component={EventResults} exact/>
            <Route path="/about" component={About} exact/>
            {/* <Route path="/signin" component={SignIn} exact/> */}
            <Route>Page not found</Route>
          </Switch>
      </BrowserRouter>
    );
  }
}


export default App;
