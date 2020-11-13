import React, { Component } from 'react';
import firebase from "firebase"

import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

firebase.initializeApp({
  apiKey: "AIzaSyAmgx9oBP1xBqN0lv2sk5jOGhG2GNRtFV0",
  authDomain: "yhack-7fd15.firebaseapp.com"
})

const CLIENT_ID = "556518293608-qip0itp4j2f8upu94ncfgc8nsqsv97e0.apps.googleusercontent.com";
const API_KEY = "AIzaSyADU2r2YFh06ExbcsU-xO5z8PrUEqYQ1BA";
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/calendar.readonly');

class SignIn extends Component {
  constructor(props){
    super(props);
    this.state = {
        signIn: false,
        eventsShown: false,
        token: null,
        isGoogle: false,
        events: []
    }
  }
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      provider.providerId,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: (result) => {
        console.log(result.credential.accessToken);
        if (result.additionalUserInfo.providerId === "google.com") {
          this.setState({ isGoogle: true })
        }
        else {
          this.setState({ isGoogle: false })
        }
        console.log(result.additionalUserInfo.providerId)
      }
    }
  }

  handleClientLoad = () => {
    window.gapi.load('client', () => {
      console.log('loaded client')
    
      window.gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      })
    })
  }

  componentDidMount = () => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    script.async = true;
    script.onload = () => {
        this.handleClientLoad();
    }
    document.body.appendChild(script);
    
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ signIn: !!user })
      console.log("user", user)
    })
  }

  showEvents = () => {
    this.setState(prevState => ({
      eventsShown: !prevState.eventsShown
    }));
    let self = this;

    window.gapi.client.calendar.events.list({
        'calendarId': 'primary',
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 20,
        'orderBy': 'startTime'
    }).then(function(response) {
        let state = self.state;
        state.events = response.result.items;
        self.setState(state);
    });
  }

  render() {
    let eventsText = this.state.eventsShown ? "Hide Events" : "Show Events"
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
        {this.state.signIn ? (
          <span>
            <div>Signed In!</div>
            <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
            <h1>Welcome {firebase.auth().currentUser.displayName}, {firebase.auth().currentUser.email}</h1>

            <div>
              {this.state.isGoogle &&  <div><button onClick={this.showEvents}>{eventsText}</button>
            <br></br>
              {this.state.eventsShown &&            
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
             }   </div> }

            </div>

            

            
          </span>
        ) : (
          <div>
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
            <StyledFirebaseAuth
              uiConfig={this.uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </div>
        )}
        
      </div>
    )
  }
}
 
export default SignIn;