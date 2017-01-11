var currTime = new Date();
var endTime = new Date();
var onWork = true;
var isPaused = false;
var timerVar;
var startTime;
var currWorkTime = 25;
var currBreakTime = 5;
var currTimeText = "";

var alarmAudio = document.createElement('audio');
    alarmAudio.src = 'http://www.lisa-copeland.com/website-music/alarmsound.mp3';
    alarmAudio.volume = 0.3;
    alarmAudio.loop = false;

/*
var audio = document.createElement('audio');
    audio.volume = 0.2;
    audio.loop = true;
*/  

function timeText(millSeconds) {
  
  // Take the number of milliseconds and turn it into a string ##:##
  
  var seconds = (millSeconds / 1000) % 60;
  var minutes =  Math.floor((millSeconds / (1000*60)) % 60);
  var secondStr = seconds.toString();
    
  if (secondStr.length < 2) {
    secondStr = "0"+secondStr;
  }
  
  return minutes.toString()+":"+secondStr; 
    
}

function startMusic(whichSong) {
  
    console.log("In StartMusic, whichSong = "+whichSong);  
  
    if (whichSong = "work") {
      audio.src = 'http://www.lisa-copeland.com/website-music/piano-ambiance-2.wav';
      }
      else {
      audio.src = 'http://www.lisa-copeland.com/website-music/jungle-shake-loop.wav';
      }
    audio.pause();
    audio.load();
    audio.play();

}

function stopMusic() {
    console.log("Stopping music");
    audio.pause();
}

function soundAlarm()
{
    // Play the alarm sound
    alarmAudio.play();
}

$(document).ready(function(){

  // On document ready, put default values in the countdown, Work Time, and break time
  document.getElementById("minutesOfWork").innerHTML = currWorkTime;
  document.getElementById("minutesOfBreak").innerHTML = currBreakTime;
  document.getElementById("countDown").innerHTML = timeText(currWorkTime * (1000 * 60));                   
  onWork = true;
  
  $("#chevLeftWorkTime").click(function() {
    // User clicks the left work time chevron to decrease the minutes of work time
    // The button will not allow the user to go lower than 1
    if ((currWorkTime) > 1)
      {
        currWorkTime--;
        document.getElementById("minutesOfWork").innerHTML = currWorkTime;
      }
      
  });
  
  $("#chevRightWorkTime").click(function() {
    // User clicks the right work time chevron to increase the minutes of work time
    // The button will not allow the user to go higher than 60
      if ((currWorkTime) < 60)
      {
        currWorkTime++;
        document.getElementById("minutesOfWork").innerHTML = currWorkTime;
      }
    
  });
  
  $("#chevLeftBreakTime").click(function() {
    // User clicks the left break time chevron to decrease the minutes of break time
    // The button will not allow the user to go lower than 1
    if ((currBreakTime) > 1)
      {
        currBreakTime--;
        document.getElementById("minutesOfBreak").innerHTML = currBreakTime;
      }
      
  });
  
  $("#chevRightBreakTime").click(function() {
    // User clicks the right break time chevron to increase the minutes of break time
    // The button will not allow the user to go higher than 60
    if ((currBreakTime) < 60)
      {
        currBreakTime++;
        document.getElementById("minutesOfBreak").innerHTML = currBreakTime;
      }
      
  });
  
  $("#startTime").click(function() {
    
    // The user has pressed play, start the countdown.
    
    if (isPaused)
      {
        isPaused = false;
      }
    else {
      startTime = new Date();
      currTime = new Date();
      endTime = new Date();
      currTime.setTime(startTime.getTime());
      endTime.setTime(startTime.getTime() - (currWorkTime * (1000 * 60)));
      timerVar = setInterval(function(){ myTimer() }, 1000);
    }
    
    console.log("Subtracting "+(currWorkTime * (1000 * 60))+
                " currWorkTime = "+currWorkTime+
                " CurrTime = "+currTime.toLocaleTimeString()+ 
                " EndTime = "+ endTime.toLocaleTimeString()+
                " StartTime = "+ startTime.toLocaleTimeString());
       
  });

  function myTimer() {
    
    // every time you get here, subtract 1000 from the currtime and display it
    
    if (!isPaused) {
      console.log("myTimer = "+ 
                " CurrTime = "+currTime.toLocaleTimeString()+
                " EndTime = "+ endTime.toLocaleTimeString());
      currTime.setTime(currTime.getTime() - 1000);
      t = timeText(currTime - endTime);
      document.getElementById("countDown").innerHTML = t;
      $('#countDown').animateCss('bounce');
      
      if (currTime <= endTime) 
        {
        // The time is up, if onWork = true, it is break time, otherwise it is back to work
        console.log("Times up! switching from one time to another");
        soundAlarm();
          
        var newTime;
        if (onWork) {
          newTime = currBreakTime;
          onWork = false;
          document.getElementById("MotivMsg").innerHTML = "Take a Break!";
          // startMusic("break");
          }
        else
          {
            newTime = currWorkTime;
            document.getElementById("MotivMsg").innerHTML = "Stay Focused!";
            onWork = true;
            // startMusic("work");
          }
          
        startTime = new Date();
        currTime.setTime(startTime.getTime());
        endTime.setTime(startTime.getTime() - (newTime * (1000 * 60)));
      }
    }
    
    }
      
  $("#pauseTime").click(function() {
    isPaused = true;
      
  });
  
  $("#stopTime").click(function() {
    //  stopMusic();
    clearInterval(timerVar);
    currWorkTime = 25;
    currBreakTime = 5;
    document.getElementById("MotivMsg").innerHTML = "Stay Focused!";
    document.getElementById("minutesOfWork").innerHTML = currWorkTime;
    document.getElementById("minutesOfBreak").innerHTML = currBreakTime;
    document.getElementById("countDown").innerHTML = timeText(currWorkTime * (1000 * 60));                   
    onWork = true;
  });
  
  $.fn.extend({
    // Ths is code that is included in for animations
    animateCss: function (animationName) {
      var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
      this.addClass('animated ' + animationName).one(animationEnd, function() {
        $(this).removeClass('animated ' + animationName);
        });
      }
  });
  
});