/**
 * @author Matteo Fattorini
 * @date 05/11/2020
 * @name RaceTime
 */

for (var z = 0; z < $(".result-span").length; z++) {
  var currentSelect = $(".result-span")[z];
  $(currentSelect).val(z);
}

$(document).ready(function () {


  

  $("#startGame").click(function () {
    $("#instructions").hide();
    $(".game-container").show()
    var round = 0;
    var timeArray = [];
    var userTimes = [];
    var toggle = false;

    for (var i = 0; i < 10; i++) {
      timeArray.push(Math.floor(Math.random() * (1500 - 500) + 500));
    }
   
      var timer = 0;
      stopTimer = 0;
      var currentTimer = setInterval(function () {
        timer += 1;
      }, 1);

      var checkmajor = setInterval(function () {
        if (timer > timeArray[round]) {
          toggle = true;
          $("#main-btn").css("backgroundColor", "red");
          stopTimer += 0.001;
          
          $(".timer").html((stopTimer).toFixed(4));
        }
      }, 1);
    
    

    $("#main-btn").click(function () {
      currentSpan = $(".result-span")[round];
      if (!toggle && round < 10) {
        penality = 1;
        userTimes.push(penality);
        $(".timer").html("Troppo Presto!");
        $(currentSpan).html(parseFloat(penality));
        round++;
      
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
      if (round == 10) {
        $(".timer").html("Game Over");
        clearInterval(currentTimer);
        clearInterval(checkmajor);
        var mean = 0;
        for (var i = 0; i < userTimes.length; i++) {
          mean += parseInt(userTimes[i]*1000);
        }
        var avg = mean / userTimes.length;
        console.log(avg);
        var finalScore = (10000 / avg).toFixed(0);
        $(".title").html("Il tuo punteggio è " + finalScore).css("color", "red");
      }


    });
  });
});
