/**
 * @author Matteo Fattorini
 * @date 05/11/2020
 * @name RaceTime
 */

//assign a value for every result-span item

for (var z = 0; z < $(".result-span").length; z++) {
  var currentSelect = $(".result-span")[z];
  $(currentSelect).val(z);
}

$(document).ready(function () {
  $("#startGame").click(function () {
    //hide and show elements at click of start btn

    $("#instructions").hide();
    $(".game-container").show();

    //variables
    var round = 0;
    var timeArray = [];
    var userTimes = [];
    var toggle = false;

    //creating an array of random 10 numbers, to use later as timer
    for (var i = 0; i < 10; i++) {
      timeArray.push(Math.floor(Math.random() * (1500 - 500) + 500));
    }

    //start a timer when pressing start btn
    var timer = 0;
    stopTimer = 0;
    var currentTimer = setInterval(function () {
      timer += 1;
    }, 1);


    //when the timer is bigger of the first random number of the array turn the dot red, and start another timer for userTime
    var checkmajor = setInterval(function () {
      if (timer > timeArray[round]) {
        toggle = true;
        $("#main-btn").css("backgroundColor", "red");
        stopTimer += 0.001;

        $(".timer").html(stopTimer.toFixed(4));
      }
    }, 1);

    //red-button click
    $("#main-btn").click(function () {
      
      //selecting the appropriate result
      var currentSpan = $(".result-span")[round];

      //if clicked too early penality of 1
      if (!toggle && round < 10) {
        penality = 1;
        userTimes.push(penality);
        $(".timer").html("Troppo Presto!");
        $(currentSpan).html(parseFloat(penality));
        round++;

      // else assign the result of userTimer and increment the round number
      } else {
        timer = 0;
        $("#main-btn").css("backgroundColor", "white");
        $(currentSpan).html(stopTimer.toFixed(4));

        round++;
        $(".timer").html("");
        userTimes.push(stopTimer.toFixed(4));
        stopTimer = 0;
        toggle = false;
      }

      //if 10 rounds passed end the game
      if (round == 10) {
        $(".timer").html("Game Over");
        clearInterval(currentTimer);
        clearInterval(checkmajor);

        //calculate final score on the base of the mean of the results
        var mean = 0;
        for (var i = 0; i < userTimes.length; i++) {
          mean += parseInt(userTimes[i] * 1000);
        }
        var avg = mean / userTimes.length;
        console.log(avg);
        var finalScore = (10000 / avg).toFixed(0);
        $(".title")
          .html("Il tuo punteggio è " + finalScore)
          .css("color", "red");
      }
    });
  });
});
