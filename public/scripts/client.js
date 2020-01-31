$(document).ready(function() {

  const standardTime = function(time) {
    const today = Date.now();
    const dayCreated = time;
    const daysAgo = Math.floor(((today - dayCreated) / (1000 * 60 * 60)) / 24);
    
    if (daysAgo === 0) {
      return "posted today";
    } else if (daysAgo === 1) {
      return "posted yesterday"
    } else {
      return `posted ${daysAgo} days ago`;
    }
  };
  
  //Generate new tweets by building HTML using variables for security
  const createTweetElement = function ({user: {avatars, handle, name}, content, created_at}) {
    
    const $avatar = $("<img>")
    .attr("src", avatars)
    
    const $name = $("<div>")
    .text(name)
    .addClass("name")
    .append($avatar);

    const $username = $("<div>")
    .text(handle)
    .addClass("username hidden");

    const $userFlex = $("<div>")
    .addClass("flex")
    .append($name, $username);

    const $tweet = $("<p>")
    .text(content.text)
    .addClass("tweet-text");

    const $timeStamp = $("<div>")
    .text(standardTime(created_at))
    .addClass("time-stamp");

    const $socialHeart = $("<i>")
    .addClass("fas fa-heart");

    const $socialFlag = $("<i>")
    .addClass("fas fa-flag");

    const $socialTweet = $("<i>")
    .addClass("fas fa-retweet");

    const $socialIcons = $("<div>")
    .addClass("social-icons")
    .append($socialHeart, $socialFlag, $socialTweet);

    const $header = $("<header>")
    .append($userFlex);

    const $footer = $("<footer>")
    .addClass("flex")
    .append($timeStamp, $socialIcons);

    const $article = $("<article>")
    .addClass("tweet")
    .append($header, $tweet, $footer);

    return $article;
  };

  //Prepend new tweets to the top of the tweets container to show newest tweets first
  const renderTweets = function(data) {
    for (const tweet of data) {
      const $newTweet = createTweetElement(tweet);
      $("#tweets-container").prepend($newTweet);
    }
  }

  const loadTweets = function() {
    $("#tweets-container").empty();
    $.get("/tweets", (data) => {
      renderTweets(data);
    })
  };

  loadTweets();

  //Events to fire once new tweet is submitted
  $("#compose-tweet").submit(function(event) {
    event.preventDefault();
    const serialData = $(this).serialize();
    const tweetLength = $("textarea").val().length;

    //Check to see that the tweet is in between  1-140 characters, if not show error message
    if (tweetLength > 140 || tweetLength <= 0) {
      return $("#error-messages").slideDown(300);
    } else {
      $("#error-messages").slideUp(300, function() {
        $("textarea").focus();
      })
    }

    //Send a post request to add new tweet
    $.post("/tweets", serialData, () => {
      $("#tweets-container").prepend(loadTweets());
      $("#compose-tweet")[0].reset();
      $(".counter").text(140);
    })
  });

  //When the #arrow-down is clicked, the "compose tweet" form should slide down and focus
  $("#arrow-down").click(function() {
    $(".new-tweet").slideToggle(500, function() {
      $(this).find("textarea").focus();
    });
  });

  //The #arrow-up is clicked, the page should scroll to the top and the "compose tweet" form 
  //should slide down and focus
  $("#arrow-up").click(function() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
    $(".new-tweet").slideDown(1200, function() {
      $(this).find("textarea").focus();
    });
  });
  
  //When the user scrolls past the header, the #write-a-tweet message and #arrow-down should be hidden
  //and the #arrow-up should appear at the bottome right corner and vice versa
  $(window).scroll(function(){
    if($(document).scrollTop() > 520){
      $("#write-a-tweet").css({"display": "none"});
      $("#arrow-down").css({"display": "none"});
      $("#arrow-up").css({"display": "block"});
    } else {
      $("#write-a-tweet").css({'display': 'block'});
      $("#arrow-down").css({'display': 'block'});
      $("#arrow-up").css({"display": "none"});
    }
  });

});

