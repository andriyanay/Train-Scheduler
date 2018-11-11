//  Initialize Firebase
  var config = {
    apiKey: "AIzaSyCfXq5Sd3sM6vDBkVYO0nmVcF6sK1KUKLI",
    authDomain: "train-scheduler-f5268.firebaseapp.com",
    databaseURL: "https://train-scheduler-f5268.firebaseio.com",
    projectId: "train-scheduler-f5268",
    storageBucket: "train-scheduler-f5268.appspot.com",
    messagingSenderId: "951150464903"
  };

  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // Create button for adding new trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

      // Variables for user inputs
      var trainName = $("#train-name-input").val().trim();
      var trainDest = $("#destination-input").val().trim();
      var trainStart = $("#start-input").val().trim();  
      var trainFreq = $("#frequency-input").val().trim();

      // Temporary object to store in firebase 
      var newTrain = {
        name: trainName,
        destination: trainDest,
        start: trainStart,
        frequency: trainFreq
      };
  
      // Push the above object to firebase 
      database.ref().push(newTrain);
  
      //  console.log(newTrain.name);
      //  console.log(newTrain.destination);
      //  console.log(newTrain.start);
      //  console.log(newTrain.frequency);
    
    // Clear user input boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");

  });
  
  // Function to retrieve information from firebase and display it on html
  database.ref().on("child_added", function(returnInfo) {
  console.log(returnInfo.val());
  
    // Variables for the information
    var trainName = returnInfo.val().name;
    var trainDest = returnInfo.val().destination;
    var trainStart = returnInfo.val().start;
    var trainFreq = returnInfo.val().frequency;
  
      console.log(trainName);
      console.log(trainDest);
      console.log(trainStart);
      console.log(trainFreq);

        // Find out what time the next train will come and in how many minutes 
        var startTimeConverted = moment(trainStart, "HH:mm");
        console.log(startTimeConverted);

        // Difference between the times
        var diffTime = moment().diff(startTimeConverted, "minutes");
        console.log("Time difference: " + diffTime);

        // Time remainder
        var timeRemainder = diffTime % trainFreq;
        console.log("Time remainder: " + timeRemainder);

        // Minutes Until Train
        var trainMins = trainFreq - timeRemainder;
        console.log("Minutes until train: " + trainMins);

        // Next Train
        var nextTrain = moment().add(trainMins, "minutes");
        var trainNext = moment(nextTrain).format("HH:mm");
        console.log("Next train: " + trainNext);
  
    // Create new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFreq),  
      $("<td>").text(trainNext),
      $("<td>").text(trainMins),
    );
  
    // Add new row to the table
    $("#train-table > tbody").append(newRow);

  });


  
