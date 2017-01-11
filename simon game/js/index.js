(function($) {
  
var greenAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var greenNormal = '#0BAA13';
var greenLitUp =  '#808080'; 
var redAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var redNormal = '#c90a03';
var redLitUp =  '#808080'; 
var blueAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var blueNormal = '#026397';
var blueLitUp =  '#808080'; 
var yellowAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
var yellowNormal = '#cccc00';
var yellowLitUp =  '#808080'; 

var currSequence = [];  
var playerSequenceIndex = 0; 
var strictMode = false;
var gameOn = false;
 
$(document).ready(function() {
  $("#powerToggle").on("click", function() {
    $("#toggle").toggleClass("on");
    if (gameOn) {
      turnPlayOff();
      gameOn = false;
    }
  else {
    turnPlayOn();
    gameOn = true;
    }
    
  }); 
});
  
 function startGame () {
  console.log("At the beginning of startGame");
  currSequence = [];
  console.log("Calling resetColors from startGame"); 
  resetColors();
  $("#gameCount").html("0");
  simonTurn();
  
  }

function gameOver () {
  console.log("At the beginning of game over");
  currSequence = [];
  turnClicksOff();
  console.log("Calling resetColors from Gameover"); 
  resetColors();
  $("#gameCount").html("0");
}  
  
function turnClicksOff () {
  $("#yellow").off("click");
  $("#blue").off("click");
  $("#green").off("click");
  $("#red").off("click");
  
}  
  
function turnClicksOn () {
  
$("#green").on("click",function() {
  playGreen();
  playerTurn("g");
  });  
  
$("#red").on("click",function() {
  playRed();
  playerTurn("r");
  }); 
  
$("#blue").on("click",function() {
  playBlue();
  playerTurn("b");
  }); 
  
$("#yellow").on("click",function() {
  playYellow();
  playerTurn("y");
  });   
  
} 

function turnPlayOn () {  
  
$("#startButton").on("click",function() {
  
  if (currSequence.length === 0) {
    // This is how I know it is not the middle of a game
    $("#startButton").css('background-color', '#00e600');
    startGame();
    }
    else
    {
      $("#startButton").css('background-color', '#bfbfbf');
      gameOver();
    }
  });  

$("#strictButton").on("click",function() {
  if (!strictMode) {  
    strictMode = true;
    $("#strictButton").css('background-color', '#ffff1a');
    // todo: Light up the strictmode indicator
  }
  else {
    strictMode = false;
    $("#strictButton").css('background-color', '#bfbfbf');
    // turn off strictmode indicator
  }
  
  });  
}  
  
function turnPlayOff() {  
    resetColors();
    turnClicksOff();  
    $("#startButton").off("click");
    $("#startButton").css('background-color', '#bfbfbf');      
    $("#strictButton").off("click");
    $("#strictButton").css('background-color', '#bfbfbf');      
    $("#gameCount").html("0");
  }
  
function resetColors() {
  console.log ("Resetting colors");
  $("#red").css('background-color', redNormal);
  $("#blue").css('background-color', blueNormal);
  $("#yellow").css('background-color', yellowNormal);
  $("#green").css('background-color', greenNormal);
}  
  
function playGreen() {
  // put all the colors to normal, light up this color
  // play the sound
  console.log("At the beginning of playGreen");
  resetColors();
  $("#green").css('background-color', greenLitUp);
  greenAudio.play();
}

function playRed() {
  // put all the colors to normal, light up this color
  // play the sound
  console.log("At the beginning of playRed");
  resetColors();
  $("#red").css('background-color', redLitUp);
  redAudio.play();
}

function playBlue() {
  // put all the colors to normal, light up this color
  // play the sound
  console.log("At the beginning of playBlue");
  resetColors();
  $("#blue").css('background-color', blueLitUp);
  blueAudio.play();
}
  
function playYellow() {
  // put all the colors to normal, light up this color
  // play the sound
  console.log("At the beginning of playYellow");
  resetColors();
  $("#yellow").css('background-color', yellowLitUp);
  yellowAudio.play();
}
  
function playerTurn(arg) { 
  
  console.log("At the beginning of playerTurn");
  
  if (currSequence[playerSequenceIndex] == arg) {
    // They picked the right one
      playerSequenceIndex++;
      if (playerSequenceIndex == currSequence.length) {
        if (currSequence.length < 20) {
          console.log("In playerturn - going into simonTurn");
          // Put in a delay between when the player's turn is over
          // and when Simon starts
          
          setTimeout(function() { resetColors(); },750);
          setTimeout(function() { simonTurn(); },1250);
          console.log("after settimeout, doing another settimeout");
          
          }
        else
          {
            // The player wins!!!
            $('#gameInfoTitle').html("Game Over!");
            $('gameInfoText').html("You Win!");
            $('#gameInfo').modal('show');
            gameOver();
          }
      }
    }
  else
    {
      if (!strictMode) {
        // user messed up - play the sequence for them again and the user then starts over
        $('#gameInfoTitle').html("Error! Sequence was Incorrect!");
        $('#gameInfoText').html("Let me play it for you again.");
        $('#gameInfo').modal('show');
        playSequence();
        }
      else {
        // In strictmode and the user messes up - the game is over!
        $('#gameInfoTitle').html("Error! Sequence was Incorrect!");
        $('#gameInfoText').html("Game Over - You Lose!");
        $('#gameInfo').modal('show');
        gameOver();
        }
    }  
}
  
function simonTurn() {

  console.log("At the beginning of simonTurn");
  
  // Don't let the user press the buttons while it
  // is the computer's turn
    
  turnClicksOff();
       
  // First, figure out the next turn to put on the stack
  
  switch (getRandomIntInclusive(1, 4)) {
    case 1: 
      currSequence.push("g");
      break;
    case 2:
      currSequence.push("r");
      break;
    case 3: 
      currSequence.push("b");
      break;
    case 4:
      currSequence.push("y");
      break;
  }

  console.log("Going to playSequence, currSequence = "+ currSequence);
  playSequence();
  console.log("Now leaving simonTurn");
  }
  
function playSequence() {
  
  playerSequenceIndex = 0;
  var index = 0;

  function nextBtn() {
    highLight(currSequence[index]);
    index++;
  }
  nextBtn();

  var presser = window.setInterval(function () {
    if (index >= currSequence.length) {
      clearTimeout(presser);
      resetColors();
      turnClicksOn();
      $("#gameCount").html(currSequence.length.toString());
      return;
    }
    nextBtn();
  }, 750);

}  
  
function highLight(arg) {
  
  console.log("Calling resetColors from highLight"); 
  resetColors();
  
  switch (arg) {
    case "g": 
      $("#green").css('background-color', greenLitUp);
      greenAudio.play();
      break;
    case "r":
      $("#red").css('background-color', redLitUp);
      redAudio.play();
      break;
    case "b": 
      $("#blue").css('background-color', blueLitUp);
      blueAudio.play();
      break;
    case "y":
      $("#yellow").css('background-color', yellowLitUp);
      yellowAudio.play();
      break;
  }
  
}  
  
function getRandomIntInclusive(min, max) {
      // Helper function that returns a random number between min & max 
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
      
      }  
  
  }(jQuery));