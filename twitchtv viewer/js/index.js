(function($) {

  var streamList = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

// Display all the channels when the page is opened
$(document).ready(function() {
  displayChannels("all");
  });
  
// If the all channels radio button is clicked  
$("#all-btn").click(function() {
  displayChannels("all");
  });  

// If the online channels radio button is clicked    
$("#online-btn").click(function() {
  displayChannels("online");
  });

// If the offline channels radio button is clicked    
$("#offline-btn").click(function() {
  displayChannels("offline");
  });  
  

function displayChannels(arg) {

  // The function that calls the twitch api and displays the channels
  var callString = "https://api.twitch.tv/kraken/streams/"; 
  var listIndex = 0;
  var offlineDiv = "";
  
  // first remove whatever is there
  $('#channelList').empty(); 
  
  // For all of the channels in the array
  for (listIndex = 0; listIndex < streamList.length; listIndex++) {
    
    // Make the stream get call
    $.ajax({
			type: 'GET',
			url: callString + streamList[listIndex],
			headers: {
				'Client-ID': 'co9k9t8sd7pi3lq1p3jvc2oyaojbpf3'
			},
			success: function(data) {
        // The call was successful
        if(data.stream === null) {
            // If data stream is null, the channel is offline, make the channel call to get the data to display
            $.ajax({
            type:'GET',  
            url: data._links.channel,
            headers: {
              'Client-ID': 'ttw9r23onu152f4ugrzbxrf8jvuqf2q'
            },
            success: function(offlineData) {
              // Display only the Logo, name, and offline
              if ((arg == "all") || (arg == "offline")) {
                offlineDiv = "<div class='col-xs-4 dataSquare'><img class = 'channelImage' src = ";
                offlineDiv += offlineData.logo + " alt='Twitch Channel/'s Image' /> <div class = 'dataText'>";
                offlineDiv += offlineData.display_name + "</div><div class = 'dataText'>Offline</div></div>";
                $('#channelList').append(offlineDiv);    
                }
              }
          });
        	
				}
        else 
        {
          // The get call for the stream shows that it is online, display it
          if ((arg == "all") || (arg == "online")) {        
            newDiv = "<div class='col-xs-4 dataSquare'><img class = 'channelImage' src = ";
            newDiv += data.stream.channel.logo + " alt='Twitch Channel/'s Image' /> <div class = 'dataText'><a href = '";
            newDiv += data.stream.channel.url + "' target = '_blank'>";
            newDiv += data.stream.channel.display_name + "</a></div><div class = 'dataText'>";
            newDiv += data.stream.game + ' ' + data.stream.channel.status+ "</div></div>";
            $('#channelList').append(newDiv);
          }
				}
			},
			error:function(err){
				//The channel does not exist
				console.log(err);
				
			}
		});
    
  }
  
}
  
}(jQuery));