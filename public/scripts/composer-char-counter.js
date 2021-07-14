$(document).ready(function() {
  // --- our code goes here ---
  console.log("ready");

  $("#tweet-text").on("input", function(event) {
    console.log($(this).val().length);
  });
});