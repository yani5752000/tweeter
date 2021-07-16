/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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
          <p id="tweets-paragraph">${text}</p> 
        </div>
        
        <footer id="tweeter-footer">
          <span>${creationTime}</span>
          <div id="icons">
            <i id="tweet-icon" class="fa-solid fa-flag"></i>
            <i id="tweet-icon" class="fa-solid fa-recycle"></i>
            <i id="tweet-icon" class="fa-solid fa-heart"></i>
          </div>
          
        </footer>
      </article>`;
  return $html;
};

//loads the tweets 
const loadTweets = function() {
   $.ajax("/tweets", { method: 'GET' })
    .then(function (thePosts) {
      console.log('Success: ', thePosts);
      renderTweets(thePosts);
    });
 };


$(document).ready(()=>{
  loadTweets();

  $("#form").submit(function( event ) {
    event.preventDefault();
    const formData = $(form);
    $.ajax("/tweets", {method: "POST", data: formData.serialize()})
      .then(function(){
        $(".tweet-container").empty();
        loadTweets();
    })
  });

  //renderTweets(data);
})