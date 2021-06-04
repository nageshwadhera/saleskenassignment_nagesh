$(document).ready(function () {
  var myCanvas = document.getElementById("myCanvas");
  var ctx = myCanvas.getContext("2d");

  //global vairables
  var progressBar;
  //Initializing variables for bar graph
  var yaxis = new Array();
  var barheight = new Array();

  //Drawing Graph for the first time
  for (var i = 1; i < 181; i++) {
    yaxis[i - 1] = Math.floor(Math.random() * (40 - -40 + 1) + -40);
    barheight[i - 1] = Math.floor(Math.random() * (70 - 40 + 1) + 40);
    drawPlayer([i] + 0.1, yaxis[i - 1], 5, barheight[i - 1], "#7E909A");
  }
  console.log(barheight);
  //Getting mouse position on Bar click and adjusting sound according to that
  $("canvas").click(function (event) {
    $("audio")[0].pause();
    $("audio")[0].currentTime = (event.pageX - 269) / 6.8;
    $("audio")[0].play();
    $("#pause_play").removeClass("fa-play");
    $("#pause_play").addClass("fa-pause");

    //Drawing Progress Bar
    for (var index = 1; index < $("audio")[0].currentTime; index++) {
      drawPlayer(
        [index] + 0.1,
        yaxis[index - 1],
        5,
        barheight[index - 1],
        "#FF847C"
      );
    }

    //Drawing gray
    for (var n = index; n < 181; n++) {
      drawPlayer([n] + 0.1, yaxis[n - 1], 5, barheight[n - 1], "#7E909A");
    }
    progressbar($("audio")[0].currentTime);
  });

  //Progress Bar feature
  function progressbar(currentTime) {
    if ($("#pause_play").attr("class").split(" ")[1] == "fa-pause") {
      progressBar = setInterval(function () {
        drawProgress($("audio")[0].currentTime);
      }, 1000);
    } else {
      clearInterval(progressBar);
    }
  }

  function drawProgress(currentTime) {
    drawPlayer(
      Math.floor(currentTime) * 10 + 10,
      yaxis[parseInt([currentTime])],
      5,
      barheight[parseInt([currentTime])],
      "#FF847C"
    );
  }

  //Function to draw Graph
  function drawPlayer(x, y, wid, hei, color) {
    y == 0 ? (y = 1) : (y = y);
    x = x / 1.5;
    ctx.save();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, wid, hei);
    ctx.restore();
  }

  //Play Pause button functioning
  $("#mplayer").click(function () {
    if ($("#pause_play").attr("class").split(" ")[1] == "fa-play") {
      $("#pause_play").removeClass("fa-play");
      $("#pause_play").addClass("fa-pause");
      $("audio")[0].play();
      progressbar($("audio")[0].currentTime);
    } else {
      $("#pause_play").removeClass("fa-pause");
      $("#pause_play").addClass("fa-play");
      $("audio")[0].pause();
      progressbar($("audio")[0].currentTime);
    }
  });
});
