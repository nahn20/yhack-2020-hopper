const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2; 
const calendar = google.calendar('v3');
const functions = require('firebase-functions');

const googleCredentials = require('./credentials.json');

const ERROR_RESPONSE = {
    status: "500",
    message: "There was an error adding an event to your Google calendar"
};
const TIME_ZONE = 'EST';

// {
//   "eventName": "Firebase Event",
//   "description": "This is a sample description",
//   "startTime": "2018-12-01T10:00:00",
//   "endTime": "2018-12-01T13:00:00",
// }

function addEvent(event, auth) {
    return new Promise(function(resolve, reject) {
        calendar.events.insert({
            auth: auth,
            calendarId: 'primary',
            resource: {
                'summary': event.eventName,
                'description': event.description,
                'start': {
                    'dateTime': event.startTime,
                    'timeZone': TIME_ZONE,
                },
                'end': {
                    'dateTime': event.endTime,
                    'timeZone': TIME_ZONE,
                },
            },
        }, (err, res) => {
            if (err) {
                console.log('Rejecting because of error');
                reject(err);
            }
            console.log('Request successful');
            resolve(res.data);
        });
    });
}

exports.addEventToCalendar = functions.https.onRequest((request, response) => {
    const eventData = {
        eventName: request.body.eventName,
        description: request.body.description,
        startTime: request.body.startTime,
        endTime: request.body.endTime
    };
    const oAuth2Client = new OAuth2(
        googleCredentials.web.client_id,
        googleCredentials.web.client_secret,
        googleCredentials.web.redirect_uris[0]
    );

    oAuth2Client.setCredentials({
        refresh_token: googleCredentials.refresh_token
    });

    addEvent(eventData, oAuth2Client).then(data => {
        response.status(200).send(data);
        return;
    }).catch(err => {
        console.error('Error adding event: ' + err.message); 
        response.status(500).send(ERROR_RESPONSE); 
        return;
    });
});

function getEvents(event, auth) {
    return new Promise(function(resolve, reject) {
        calendar.events.list({
          auth: auth,
          calendarId: 'primary',
          timeMin: event.startTime,
          timeMax: event.endTime,
          timeZone: event.timeZone,
          singleEvents: true,
          orderBy: 'startTime',
        },
        (err, res) => {
            if (err) {
                console.log('Rejecting because of error');
                reject(err);
            }
            console.log('Request successful');
            resolve(res.data);
        });
    });
}

// {
//   "startTime": "2020-11-10T10:00:00",
//   "endTime": "2020-11-15T13:00:00",
//   "timeZone": "EST"
// }

exports.getEventsFromCalendar = functions.https.onRequest((request, response) => {
    const eventData = {
        startTime: request.body.startTime,
        endTime: request.body.endTime,
        timeZone: request.body.timeZone
    };
    const oAuth2Client = new OAuth2(
        googleCredentials.web.client_id,
        googleCredentials.web.client_secret,
        googleCredentials.web.redirect_uris[0]
    );

    oAuth2Client.setCredentials({
        refresh_token: googleCredentials.refresh_token
    });

    getEvents(eventData, oAuth2Client).then(data => {
        response.status(200).send(data);
        return;
    }).catch(err => {
        console.error('Error getting events: ' + err.message); 
        response.status(500).send(ERROR_RESPONSE); 
        return;
    });
});