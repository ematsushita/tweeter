const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]


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

  renderTweets(data);
});

