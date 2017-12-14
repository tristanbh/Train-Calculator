//variables for times, and time conversion

  var firstTime = "";
  var firstTrainConvert = "";
  var timeDiff= "";
  var nextTrain = "";
  var minAway = "";
  var nextArrive = "";
  var currentTime = moment();


// firebase 
  var config = {
    apiKey: "AIzaSyC-0ojsexZ10pPl4exWFIbUX0Iz8Sgu_-M",
    authDomain: "ttraintime-8b5f6.firebaseio.com/",
    databaseURL: "https://traintime-8b5f6.firebaseio.com/",
    projectId: "traintime-8b5f6",
    storageBucket: "gs://traintime-8b5f6.appspot.com",
    messagingSenderId: "691591091134"
  };

  firebase.initializeApp(config);


  var database = firebase.database();

  $("#add-train-btn").on("click", function(event){


  event.preventDefault();

//inputs from forms
  var trainName = $("#train-input").val();
  var trainDest = $("#dest-input").val();
  var trainFreq = $("#freq-input").val();
  var firstTrain = $("#first-train").val();

//converts time and calculates when next train arrives
  firstTrainConvert = moment(firstTrain, "hh:mm");
  timeDiff = moment().diff(moment(firstTrainConvert), "minutes");
  timeRemainder = timeDiff % trainFreq;
  minAway = trainFreq - timeRemainder;
  nextTrain = moment().add(minAway, "minutes");
  nextArrive = moment(nextTrain).format("hh:mm")

  var currentTime = moment();

  console.log(currentTime);

//object for firebase
  var newTrain = {
    train: trainName,
    destination: trainDest,
    frequency: trainFreq,
    minutesAway: minAway,
    nextArrival: nextArrive,

  }

  database.ref().push(newTrain);

  console.log(newTrain.train);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);

  alert("Train has been added");

  $("#train-input").val("");
  $("#dest-input").val("");
  $("#freqInput").val("");
  });
//calling data from database
  database.ref().on("child_added", function(childSnapshot, prevChildKey){
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().train;
  var trainDest = childSnapshot.val().destination;
  var trainFreq = childSnapshot.val().frequency;
  var minAway = childSnapshot.val().minutesAway;
  var nextArrive = childSnapshot.val().nextArrival;
//output to tables in html
  $("#train-table > tbody").append("<tr id='trainCell'><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + "</td><td>" + nextArrive + "</td><td>" + minAway + "</td></tr>")
});