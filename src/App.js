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
        {CreateOrUpdateEvent({event_name: "Hello", time: "time", eventID: "event2", template: [1,0,0,1], time_heat_map: [1,1,1,1]})}
        {CreateOrUpdateEvent({event_name: "Hello", time: "time", eventID: "event3", template: [1,0,0,1], time_heat_map: [1,0,0,1]})}
        {CreateOrUpdateEvent({event_name: "Hello", time: "time", eventID: "event4", template: [1,0,0,1], time_heat_map: [0,0,0,1]})}
        {CreateOrUpdateUserInEvent("event2", "schedule1", "a", [1,1,0,1])}
        {CreateOrUpdateUserInEvent("event2", "schedule2", "b", [1,0,0,1])}
        {CreateOrUpdateUserInEvent("event2", "schedule3", "c", [1,1,1,1])}
        {CreateOrUpdateUserInEvent("event3", "schedule1", "a", [1,0,0,1])}
        {CreateOrUpdateUserInEvent("event3", "schedule2", "b", [0,0,0,1])}
        {CreateOrUpdateUserInEvent("event3", "schedule3", "c", [1,0,0,0])}
        {CreateOrUpdateUserInEvent("event4", "schedule1", "a", [0,0,0,1])}
        {CreateOrUpdateUserInEvent("event4", "schedule2", "b", [0,0,0,1])}
        {CreateOrUpdateUserInEvent("event4", "schedule3", "c", [0,0,0,1])}
        {GetEvent("event2")}
        {GetEvent("event2")}
        {GetEvent("event2")}
        {UpdateBestTime("event2")}

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

/* Map of each event:
Event
|-->event-name
|-->time
|-->id
|-->template
|-->schedules
----|-->user1
----|---|-->name
----|---|-->schedule
----|-->user2
----|---|-->name
----|---|-->schedule
----|-->user3
----|---|-->name
----|---|-->schedule
*/


// Call this on any event with eventID
// Returns a JSON object of form {event_name: "event_name", time: "time", eventID: "eventID", template: Array(), time_heat_map: Array()}
function GetEvent (eventID){
  // Reference to event
  let event = firestore.collection("events").doc(eventID);
  event.get().then(function(doc){
    console.log(doc.data());
    return(doc.data());
  }).catch(function(error) {
    console.log("Error getting cached document:", error);
});
}

// The reverse of GetEvent(eventID)
// Takes in payload of form {event_name: "event_name", time: "time", eventID: "eventID", template: Array(), time_heat_map: Array()}
// Creates or updates an event. Then sets name, time, and template property of event to name, time, template
function CreateOrUpdateEvent(payload){
  firestore.collection("events").doc(payload.eventID).set({
    event_name: payload.event_name,
    time: payload.time,
    eventID: payload.eventID,
    template:payload.template,
    time_heat_map: payload.template
  })
  .then(function() {
    console.log("Document successfully written!");
    UpdateBestTime(payload.eventID);
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
  });
}

// Call this on any user with userID in event with eventID
// Creates or updates a user in event. Then sets name and schedule property of user to name and schedule
function CreateOrUpdateUserInEvent(eventID, userID, name, schedule){
  // Fetch schedules of all users
  let eventParticipant = firestore.collection("events").doc(eventID).collection("schedules").doc(userID);
  eventParticipant.set({
    name: name,
    schedule: schedule
  })
  .then(function() {
    console.log("Document successfully written!");
    UpdateBestTime(eventID);
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
  });
}

// Call this on any event with eventID and it will tally up all the schedules and save it to time_heat_map of event
function UpdateBestTime (eventID){
  // Reference to event
  let event = firestore.collection("events").doc(eventID);
  // Fetch schedules of all users
  let schedulesCollection = event.collection("schedules");
  // Initialize a tallied schedules counter. This pairwise sums all schedules to create a heatmap of best times. It starts out as the template since the admin is the first tallied user

  event.get().then(function(doc){
    let talliedSchedules = doc.data()["template"]
    console.log(talliedSchedules); 

    schedulesCollection.get().then((querySnapshot) => {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          let userSnapShot = doc.data()
          let userSchedule = userSnapShot["schedule"]
          // pairwise userSchedule to the talliedSchedules
          talliedSchedules = talliedSchedules.map((i,j) => i + userSchedule[j]);

        event.update({
          time_heat_map: talliedSchedules
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
      });
    });
  }).catch(function(error) {
    console.log("Error getting cached document:", error);
});


}
// END FUNCTIONS

export default App;
