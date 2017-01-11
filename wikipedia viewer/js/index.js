
var TitleURL = "";

function MakeCall()
{
  
     $.ajax({
      type: 'GET',
      url: TitleURL,
      async: false,
      dataType: 'json',
      success: function(data) {
         $('#output').html('');
        for (i=0; i<data[1].length; i++){
         $('#output').append("<li><a href="+data[3][i]+" target='_blank'>"+data[1][i]+"</a><p>"+data[2][i]+"</p></li>");
            }
               },
      error: function(errorMessage){
        alert('Error');
      }
    });  
      
}

$(document).ready(function(){
  $( "#titleText" ).change(function() {
    TitleURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+$( this ).val()+"&format=json&callback=?";
    MakeCall();
  });
});