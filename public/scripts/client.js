/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//this will be used to prevent messages that damage the system
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  tweets.forEach((tweetObj) => {
    const $tweet = createTweetElement(tweetObj);
    $(".tweet-container").prepend($tweet);
  })
}
//outputs an article when given a tweet object
const createTweetElement = function(tweetObj) {
const avatar = tweetObj.user.avatars;
const name = tweetObj.user.name;
const handle = tweetObj.user.handle;
const text = tweetObj.content.text;
const creationTime = timeago.format(tweetObj["created_at"]);


//creating the new article containing the new tweet
const $html = `<article>
        <header class="newton-header">
          <div id="newton">
            <div class="tweets-im">
              <img src="${avatar}"> 
            </div>
            <p>${name}</p>
          </div>
          <div id="handle">
            <span>${handle}</span>
          </div>
          
        </header>
        <div id="tweets-message">
          <p id="tweets-paragraph">${escape(text)}</p> 
        </div>
        
        <footer id="tweeter-footer">
          <span>${creationTime}</span>
          <div id="icons">
            <i id="icon1" class="fas fa-flag"></i>
            <i id="icon2" class="fas fa-retweet"></i>
            <i id="icon3" class="fas fa-heart"></i>
          </div>
          
        </footer>
      </article>`;
  return $html;
};

//loads the tweets 
const loadTweets = function() {
   $.ajax("/tweets", { method: 'GET' })
    .then(function (thePosts) {
      renderTweets(thePosts);
    });
 };


$(document).ready(()=>{
  //hiding the error messages
  $("#is-empty").hide();
  $("#exceeds").hide();
  loadTweets();

  $("#form").submit(function( event ) {
    event.preventDefault();
    //hiding the error messages
    $("#is-empty").hide();
    $("#exceeds").hide();
    const formData = $(form);
    //give error message if data is null
    if (formData === null ) {
      $("#is-empty").slideDown();
      return;
    }
    //getting rid of the "default" "text="
    const text = formData.serialize().replace("text=", "");
    //if more than 140 characters give error message
    if (text.length > 140) {
      $("#exceeds").slideDown();
      return;
    }

    $.ajax("/tweets", {method: "POST", data: formData.serialize()})
      .then(function(){
        //empty the container to avoid duplicate messages
        $(".tweet-container").empty();
        loadTweets();
        formData[0].reset();
    })
      .catch((err)=>{
          //if the message is empty give error message
          $("#is-empty").slideDown();
      })
  });
})