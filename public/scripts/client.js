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
    .append($name)
    .append($username);

    const $footer = $("<footer>")
    .append($socialIcons, $timeStamp);

    const $article = $("<article>")
    .addClass("tweet")
    .append($header, $tweet, $footer);

    return $article;
  };

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

  $("#composeTweet").submit(function(event) {
    event.preventDefault();
    const serialData = $(this).serialize();
    const tweetLength = $("textarea").val().length;
    if (tweetLength > 140 || tweetLength <= 0) {
      return alert("Tweets must be between 1 and 140 characters")
    }
    $.post("/tweets", serialData, () => {
      $("#tweets-container").prepend(loadTweets());
      $("#composeTweet")[0].reset();
      $(".counter").text(140);
    })
  });

  $("#arrow-down").click(function() {
    $(".new-tweet").slideToggle(500, function() {
      $(this).find("textarea").focus();
    });
  });

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
  

  $(window).scroll(function(){
    if($(document).scrollTop() > 520){
      $(".form-toggle").css({"display": "none"});
      $("#arrow-up").css({"display": "block"});
    } else {
      $(".form-toggle").css({'display': 'block'});
      $("#arrow-up").css({"display": "none"});
    }
  });

});

