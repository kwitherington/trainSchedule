var config = {
    apiKey: "AIzaSyDAze9MrQVL_sWI7im5NSxzZprDoGM-skk",
    authDomain: "trainschedule-d3f4b.firebaseapp.com",
    databaseURL: "https://trainschedule-d3f4b.firebaseio.com",
    projectId: "trainschedule-d3f4b",
    storageBucket: "trainschedule-d3f4b.appspot.com",
    messagingSenderId: "755142058543"
};

firebase.initializeApp(config);

// Assign the reference to the database to a variable named 'database'

var database = firebase.database();

var nameInput;
var destInput;
var firstTimeInput;
var freqInput;

// At the initial load and subsequent value changes, get a snapshot of the stored data.
// This function allows you to update your page in real-time when the firebase database changes.
database.ref().on("child_added", function(snapshot) {
    nameInput = snapshot.val().name;
    destInput = snapshot.val().destination;
    firstTimeInput = snapshot.val().firstTime;
    freqInput = snapshot.val().frequency;
    console.log(nameInput);
    loadRow();

// If any errors are experienced, log them to console.
}, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// Whenever a user clicks the submit-bid button
$("#submitTrain").on("click", function(event) {
    // Prevent form from submitting
    event.preventDefault();

    nameInput = $("#nameInput").val();
    destInput = $("#destInput").val();
    firstTimeInput = $("#firstTimeInput").val();
    freqInput = $("#freqInput").val();

    database.ref().push({
        name: nameInput,
        destination: destInput,
        firstTime: firstTimeInput,
        frequency: freqInput,
        timeAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

function loadRow() {
    var newRow = $("<tr>");

    var name = $("<td>");
    var destination = $("<td>");
    var frequency = $("<td>");
    var nextArv = $("<td>");
    var minsAway = $("<td>");

    name.text(nameInput);
    destination.text(destInput);
    frequency.text(freqInput);
    nextArv.text("future time based on frequency");
    minsAway.text("future minus current");

    newRow.append(name);
    newRow.append(destination);
    newRow.append(frequency);
    newRow.append(nextArv);
    newRow.append(minsAway);

    $("#dataTable").append(newRow);
}

function numberWithCommas(x) {
x = x.toString();
var pattern = /(-?\d+)(\d{3})/;
while (pattern.test(x))
    x = x.replace(pattern, "$1,$2");
return x;
}