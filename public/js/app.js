// replace these values with those generated in your TokBox Account
var apiKey = "46227952";
var sessionId = "2_MX40NjIyNzk1Mn5-MTU0MzQ0MTA3MjM5MX44S08rUTAwMkNmWkhzSUdJMlZubGUvQ0V-fg";
var token = "T1==cGFydG5lcl9pZD00NjIyNzk1MiZzaWc9NGM5YWVmNjIzOWY1NDRmNTk3NWEzZTc2MmVjOThmNTc1YWEzYzU0YTpzZXNzaW9uX2lkPTJfTVg0ME5qSXlOemsxTW41LU1UVTBNelEwTVRBM01qTTVNWDQ0UzA4clVUQXdNa05tV2toelNVZEpNbFp1YkdVdlEwVi1mZyZjcmVhdGVfdGltZT0xNTQzNDQxMTMxJm5vbmNlPTAuNzUyNDkzOTI0MTA2MTY4MyZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTQ2MDMzMTMwJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

// (optional) add server code here
initializeSession();

// Handling all of our errors here by alerting them
function handleError(error) {
    if (error) {
      alert(error.message);
    }
}
  
function initializeSession() {
    var session = OT.initSession(apiKey, sessionId);

    // Subscribe to a newly created stream
    session.on('streamCreated', function(event) {
        session.subscribe(event.stream, 'subscriber', {
            insertMode: 'append',
            width: '100%',
            height: '100%'
        }, handleError);
    });

    // Create a publisher
    var publisher = OT.initPublisher(
        'publisher', {
        insertMode: 'append',
        width: '100%',
        height: '100%'
    }, handleError);

    // Connect to the session
    session.connect(token, function(error) {
        // If the connection is successful, publish to the session
        if (error) {
            handleError(error);
        } else {
            session.publish(publisher, handleError);
        }
    });
}