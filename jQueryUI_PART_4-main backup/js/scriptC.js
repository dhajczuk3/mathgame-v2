const audioRight = document.getElementById("audioRight");  
const audioWrong = document.getElementById("audioWrong");  

    //DRAGGABLES START HERE
    $(".circle").draggable({
        revert: "invalid",
        helper: "clone",
        containment: "#container",
        disabled:true
    }).css("opacity", 0.5);
    //DROPZONES START HERE
    $("#result1").droppable({
        accept: "#C1,#C2,#C3,#C4,#C5,#C6,#C7,#C8,#C9",
        hoverClass: "drop-hover",
        over: handleOverEvent,
        out: handleOutEvent,
        drop: handleDropEvent
    });
    $("#result2").droppable({
        accept: "#C1,#C2,#C3,#C4,#C5,#C6,#C7,#C8,#C9",
        hoverClass: "drop-hover",
        over: handleOverEvent,
        out: handleOutEvent,
        drop: handleDropEvent
    });
    $("#result3").droppable({
        accept: "#C1,#C2,#C3,#C4,#C5,#C6,#C7,#C8,#C9",
        hoverClass: "drop-hover",
        over: handleOverEvent,
        out: handleOutEvent,
        drop: handleDropEvent
    });
    $("#result4").droppable({
        accept: "#C1,#C2,#C3,#C4,#C5,#C6,#C7,#C8,#C9",
        hoverClass: "drop-hover",
        over: handleOverEvent,
        out: handleOutEvent,
        drop: handleDropEvent
    });
    $("#result5").droppable({
        accept: "#C1,#C2,#C3,#C4,#C5,#C6,#C7,#C8,#C9",
        hoverClass: "drop-hover",
        over: handleOverEvent,
        out: handleOutEvent,
        drop: handleDropEvent
    });
    $("#result6").droppable({
        accept: "#C1,#C2,#C3,#C4,#C5,#C6,#C7,#C8,#C9",
        hoverClass: "drop-hover",
        over: handleOverEvent,
        out: handleOutEvent,
        drop: handleDropEvent
    });
    $("#result7").droppable({
        accept: "#C1,#C2,#C3,#C4,#C5,#C6,#C7,#C8,#C9",
        hoverClass: "drop-hover",
        over: handleOverEvent,
        out: handleOutEvent,
        drop: handleDropEvent
    });
    $("#result8").droppable({
        accept: "#C1,#C2,#C3,#C4,#C5,#C6,#C7,#C8,#C9",
        hoverClass: "drop-hover",
        over: handleOverEvent,
        out: handleOutEvent,
        drop: handleDropEvent
    });
    $("#result9").droppable({
        accept: "#C1",
        hoverClass: "drop-hover",
        over: handleOverEvent,
        out: handleOutEvent,
        drop: handleDropEvent
    });
    //GLOBAL VARIABLES
    let score = 0;
    let clearTimer;
    let counter;
    let rightAnswers = 1;
    
    
    //----- FUNCTIONS BEGIN HERE -----\\
    function checkScore() {
        if (rightAnswers === 9) {
            $(".scoremessage").fadeIn();
            score = score + counter;
            $('#score').text(score);
            $(".scoremessage").text("Well done! Your score is: " + score);
            stopTimer();
        } //END check score
    }
    function handleDropEvent(event, ui) {

        let elementID = $(ui.draggable).attr('id');
        let dropzoneID = $(this).attr("data-value");

        console.log(elementID);
        console.log(dropzoneID);

        if (dropzoneID === elementID) {
            ui.draggable.draggable({
                disabled: true
            }).css("opacity", 0.5);
            $(this).html(`<img src="images/thumb.png">`);
            $(this).droppable("destroy");



            //score things
            score = score + 10;

            //counter
            if (rightAnswers < 8)
            {
            counter = counter + 4;
            }

            $('#score').text(score);
            checkScore();

            //play audio
            audioRight.play();

            //add 1 to correct answers count
            rightAnswers++;

            
        }
        else if (dropzoneID !== elementID) {
            ui.draggable.draggable({
                disabled: false
            })
            audioWrong.play();
            $(this).html(`<img src="images/questionmark.png">`);

            score = score - 5;
            counter = counter - 2;
            checkScore();
            $('#score').text(score);
          }
    } //END handleDropEvent

    function handleOverEvent(event, ui) {
        $(this).html();
    } //END handleOverEvent

    function handleOutEvent(event, ui) {
        $(this).html(`<img src="images/questionmark.png">`);
     } //END handleOutEvent 

    //TIMER STARTS HERE
   
    // Reload page Button
    let btn = $("#btn_reload").on("click", function () {
        location.reload(true);
    });
    $("#btn_start").on("click", startGame);

    
//GAME CODE STARTS HERE

function startGame(){
    $("#btn_start").hide();
    $(".circle").draggable({
        disabled:false
    }).css("opacity", 1);

    startTimer();
    $(".scoremessage").fadeOut();
}

function startTimer(){
counter = 16;
score = 0;
clearTimer = setInterval(function () {
counter--;
randomizeCircles();
if (counter >= 0) {
    let countdown = document.getElementById("timer");
    countdown.innerHTML = " " + counter;
}

if (counter < 0) {
    clearInterval(clearTimer);
    $(".circle").draggable({
        disabled:true
    }).css("opacity", 0.5);
    score = score + counter;
    $('#score').text(score);
    $(".scoremessage").fadeIn();
    $(".scoremessage").text("Out of time! Your score was: " + score + ". Try again!");
    
}

}, 1000)
}




function stopTimer() {
    clearInterval(clearTimer);
}


function randomizeCircles() {
    var circles = document.querySelectorAll("#circles .circle");
    for (var i = circles.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = circles[i];
        circles[i] = circles[j];
        circles[j] = temp;
    }
    var circlesContainer = document.querySelector("#circles");
    circles.forEach(function(circle) {
        circlesContainer.appendChild(circle);
    });
}
window.onload = randomizeCircles();