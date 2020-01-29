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
  
  const createTweetElement = function (data) {
    
    const $avatar = $("<img>")
    .attr("src", data.user.avatars)
    
    const $name = $("<div>")
    .text(data.user.name)
    .addClass("name")
    .append($avatar);

    const $username = $("<div>")
    .text(data.user.handle)
    .addClass("username hidden");

    const $tweet = $("<p>")
    .text(data.content.text)
    .addClass("tweet-text");

    const $timeStamp = $("<div>")
    .text(standardTime(data.created_at))
    .addClass("time-stamp");

    const socialIcons =
    `<div class="social-icons">
    <i class="fas fa-heart"></i>
    <i class="fas fa-flag"></i>
    <i class="fas fa-retweet"></i>
    </div>`;

    const $header = $("<header>")
    .append($name)
    .append($username);

    const $footer = $("<footer>")
    .append(socialIcons, $timeStamp);

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
    })
  });

});

