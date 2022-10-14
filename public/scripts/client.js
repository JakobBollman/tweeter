const renderTweets = function(tweets) {
  $('section.tweets-container').empty();
  for (let item in tweets) {
    let $tweet = createTweetElement(tweets[item]);
    $('section.tweets-container').prepend($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
  }
};

const createTweetElement = function(tweet) {
  let $tweet = `
<article class='tweet'>
  <header>
    <img src="${tweet.user.avatars}">
    <div class="names">
      <label class="user">${tweet.user.name}</label>
      <label class="username">${tweet.user.handle}</label>
    </div>
  </header>

  <label class="tweetbody">${tweet.content.text}</label>

  <footer>
    <label class="postage">${timeago.format(tweet.created_at)}</label>

    <div class="idiv">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </div>
  
  </footer>
</article>`;

  return $tweet;
};


$(document).ready(function() {

  $("#tweetform").submit(function(event) {
    event.preventDefault();

    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const safeHTML = `${escape($('#tweet-text').val())}`;
    $('#tweet-text').val(safeHTML);

    const displayError = function(message) {
      $("#error-message").empty();
      $("#error-message").append(message);
      $('#error-box').show();
      $('#error-box').css("color","red");
      $('#error-box').css("border","5px solid red");
    };

    if ($.trim(safeHTML) == "") {
      displayError("PLEASE ENTER TWEET! TWEET TOO SHORT!");
    
    } else if (safeHTML.length > 140) {
      displayError("PLEASE SHORTEN TWEET! TWEET TOO LONG!");
      
    } else {
      $.post('/tweets',$('#tweet-text').serialize())
        .then(function() {
          $('#error-box').hide();
          loadtweets();
          $('#tweet-text').val('');
          $(".counter").empty();
          $(".counter").append('140');

        });
    }
  });
  
  const loadtweets = (function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(data) {
        renderTweets(data);
      });
  });
  loadtweets();

});