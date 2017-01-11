$(document).ready(function() {

  var tweetText = "";
  
  var url = "http://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?";
  
  function getQuote()
  {
    $.getJSON(url, function(data) {
    $(".quote-text").text(data.quoteText);
    if (data.quoteAuthor === '') {
      data.quoteAuthor = 'Unknown';
      
    }
    tweetText = data.quoteText + ' '+ data.quoteAuthor;
    $(".author-text").text('Author: ' + data.quoteAuthor);

  });
  }

  $("#get-another-quote-button").click(function() {
      getQuote();
  });
 
$('#tweet-button').click(function (e) {
 
  
 var twtLink = 'http://twitter.com/home?status=' +encodeURIComponent(tweetText);
 window.open(twtLink,'_blank');
 
 });
});