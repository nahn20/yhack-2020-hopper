import React, { Component } from 'react';

const CLIENT_ID = "556518293608-qip0itp4j2f8upu94ncfgc8nsqsv97e0.apps.googleusercontent.com";
const API_KEY = "AIzaSyADU2r2YFh06ExbcsU-xO5z8PrUEqYQ1BA";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

class SignIn extends Component {
  constructor(props){
    super(props);
    this.state = {
      signIn: false,
      events: []
    }

  }
  handleClientLoad = () => {
    window.gapi.load("client:auth2", this.initClient);
  }
  initClient = () => {
    let updateSigninStatus = this.updateSigninStatus;
    window.gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(function () {
      // Listen for sign-in state changes.
      window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    }, function(error) {
      console.log(JSON.stringify(error, null, 2));
    });
  }
  updateSigninStatus = (isSignedIn) => {
    let state = this.state;
    state.signIn = isSignedIn;
    this.setState(state);
  }
  googleSignIn = (signIn) => {
    if(signIn){
      window.gapi.auth2.getAuthInstance().signOut();
    }
    if(!signIn){
      window.gapi.auth2.getAuthInstance().signIn();
    }
  }
  showEvents = () => {
    let self = this;
    window.gapi.client.calendar.events.list({
      'calendarId': 'primary',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then(function(response) {
      let state = self.state;
      state.events = response.result.items;
      self.setState(state);
    });
  }
  componentDidMount = () => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.async = true;
    script.onload = () => {
      this.handleClientLoad();
    }
    document.body.appendChild(script);
  }
  render() {
    let signInText = "Sign Out";
    if(!this.state.signIn){
      signInText = "Sign In"
    }
    let table = [];
    for(let i = 0; i < this.state.events.length; i++){
      let event = this.state.events[i];
      if(!event.start.dateTime){
        event.start.dateTime = "ALL DAY";
        event.end.dateTime = "ALL DAY";
      }
      table.push(<tbody key={i}>
        <tr>
          <td style={{border: "1px solid black", borderCollapse: "collapse", padding: "1px 5px"}}>{event.summary}</td>
          <td style={{border: "1px solid black", borderCollapse: "collapse", padding: "1px 5px"}}>{event.start.dateTime}</td>
          <td style={{border: "1px solid black", borderCollapse: "collapse", padding: "1px 5px"}}>{event.end.dateTime}</td>
        </tr>
      </tbody>);
    }
    return (
      <div>
        <button onClick={() => this.googleSignIn(this.state.signIn)}>{signInText}</button>
        <button onClick={this.showEvents}>Show Events</button>
        <br/>
        <table style={{border: "1px solid black", borderCollapse: "collapse"}}>
          <thead>
            <tr style={{border: "1px solid black", borderCollapse: "collapse"}}>
              <th style={{border: "1px solid black", borderCollapse: "collapse", padding: "1px 5px"}}>Event Name</th>
              <th style={{border: "1px solid black", borderCollapse: "collapse", padding: "1px 5px"}}>Event Start</th>
              <th style={{border: "1px solid black", borderCollapse: "collapse", padding: "1px 5px"}}>Event End</th>
            </tr>
          </thead>
          {table}
        </table>
      </div>
    );
  }
}
 
export default SignIn;