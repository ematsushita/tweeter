$(document).ready(function() {
  
  const createTweetElement = function (data) {
    return `
    <article class="tweet">
          <header> 
            <div class="name"><img src=${data.user.avatars}> ${data.user.name}</div><div class="username hidden">${data.user.handle}</div>
          </header>
            <p class="tweet-text">${data.content.text}</p>
          <footer>
            <div class="time-stamp">${data.created_at}</div><div class="social-icons"><img src="/images/ig.png"><img src="/images/facebook.png"><img src="/images/twitter2.png"></div>
          </footer>
          
        </article>`
  }

  const renderTweets = function(data) {
    for (const tweet of data) {
      let $newTweet = createTweetElement(tweet);
      $("#tweets-container").prepend($newTweet);
    }
  }

  const loadTweets = function() {
    $.get("/tweets", (data) => {
      renderTweets(data);
    })
  }

  loadTweets();

  $("#composeTweet").submit(function(event) {
    event.preventDefault();
    const serialData = $(this).serialize();
    const tweetLength = $("textarea").val().length;
    if (tweetLength > 140 || tweetLength <= 0) {
      alert("Tweets must be between 1 and 140 characters")
    }
    $.post("/tweets", serialData, () => {
      console.log("success");
    })
  })

});

