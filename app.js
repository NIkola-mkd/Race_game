$(function () {
  //write your code here

  let carRes1 = "";
  let carRes2 = "";

  $("#start").click(function () {
    $("#start").addClass("disabled");
    $("#startOver").addClass("disabled");
    $("#flag").removeClass("flagEnable").addClass("flagDisable");
    let finished = false;
    let place = "first";
    let timer = 3;
    $(".countdown").removeClass("flagDisable");
    $(".countdown").html(`<span id="timer">${timer}</span>`);
    let interval = setInterval(function () {
      //   console.log(timer);

      timer--;
      $(".countdown").html(`<span id="timer">${timer}</span>`);

      if (timer == 0) {
        clearInterval(interval);
        $(".countdown").addClass("flagDisable");
        //   animations car1
        $("#car1").animate(
          {
            left: raceTrackWidth,
          },
          carTime1,
          function () {
            // console.log("car 1 finished in time" + carTime1);
            checkPlace();
            $("#car1Info").append(`<p class="carInfo">
	 Finished in :
	 <b class="car1">${place}</b>
	 place with a time of
	 <b class="car1">${carTime1}</b>
	 milliseconds
   </p>`);

            carRes1 += `<p class="carInfo">
   <b class="car1">Car1</b>
   finished in :
   <b class="car1">${place}</b>
   place with a time of
   <b class="car1">${carTime1}</b>
   milliseconds
</p>`;
            localStorage.setItem("car1", carRes1);
          }
        );
        //   animations car2
        $("#car2").animate(
          {
            left: raceTrackWidth,
          },
          carTime2,
          function () {
            // console.log(" car 2 finished in time " + carTime2);
            checkPlace();
            $("#carInfo2").append(`<p class="carInfo">
	 Finished in :
	 <b class="car2">${place}</b>
	 place with a time of
	 <b class="car2">${carTime2}</b>
	 milliseconds
   </p>`);

            carRes2 += `<p class="carInfo">
   <b class="car2">Car2</b>
   finished in :
   <b class="car2">${place}</b>
   place with a time of
   <b class="car2">${carTime2}</b>
   milliseconds
 </p>`;
            localStorage.setItem("car2", carRes2);
          }
        );
      }
    }, 1000);
    function checkPlace() {
      if (finished == false) {
        finished = true;
        $("#flag").removeClass("flagDisable").addClass("flagEnable");
      } else {
        place = "second";
        $("#startOver").removeClass("disabled");
        $("#start").removeClass("disabled");
      }
    }
    let carWidth1 = $("#car1").width();
    let carWidth2 = $("#car2").width();
    let raceTrackWidth = $(window).width() - carWidth1; //cars have same width
    //  random car race time
    let carTime1 = Math.floor(Math.random() * 10000 + 1000);
    let carTime2 = Math.floor(Math.random() * 10000 + 1000);
  });

  //   start over
  $("#startOver").click(function () {
    $("#flag").removeClass("flagEnable").addClass("flagDisable");
    $("#start").removeClass("disabled");
    $("#car1").css("left", "0");
    $("#car2").css("left", "0");
  });

  $(window).bind("load", function () {
    let arrPreviousRes = [
      [localStorage.getItem("car1")][localStorage.getItem("car2")],
    ];

    for (let i = 0; i < arrPreviousRes.length; i++) {
      for (let j = 0; j < arrPreviousRes.length; j++) {
        $("#pastResults").append(localStorage.getItem("car1"))[i][j];
        $("#pastResults").append(localStorage.getItem("car2"))[i][j];
      }
    }
  });
});
