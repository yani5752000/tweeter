$(document).ready(function() {
  // --- our code goes here ---
  console.log("ready");

  $("#tweet-text").on("input", function(event) {
    console.log(140 - $(this).val().length);
    let tweetLength = $(this).val().length;
    let counter = $("#counter");
    counter.val(140 - tweetLength);
    if (counter.val() < 0) {
      counter.css("color", "red");
    } else {
      counter.css("color", "#545149");
    }
  });
});