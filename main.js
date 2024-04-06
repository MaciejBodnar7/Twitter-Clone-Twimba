import { tweetsData } from "./data.js";

const tweetBtn = document.getElementById("tweet-btn");
const tweetInput = document.getElementById("tweet-input");

tweetBtn.addEventListener("click", function () {
  console.log(tweetInput.value);
});

document.addEventListener("click", function (e) {
  if (e.target.dataset.likes) {
    const uuidOfLike = e.target.dataset.likes;
    handleLikeClick(uuidOfLike);
  } else if (e.target.dataset.retweets) {
    const uuidOfRetweets = e.target.dataset.retweets;
    handleRetweetClick(uuidOfRetweets);
  }
});

//Obsidian 20
function handleLikeClick(tweetId) {
  // test if uuid from tweetData is the same from click
  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId; //test
    //if that true element(object) will be save to targetTweetObj
  })[0]; //save position 0 of array (it only have one index anyway)

  if (!targetTweetObj.isLiked) {
    targetTweetObj.likes++;
    targetTweetObj.isLiked = true;
  } else {
    targetTweetObj.likes--;
    targetTweetObj.isLiked = false;
  }
  render();
}

function handleRetweetClick(tweetId) {
  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId;
  })[0];

  if (!targetTweetObj.isRetweeted) {
    targetTweetObj.retweets++;
    targetTweetObj.isRetweeted = true;
  } else {
    targetTweetObj.retweets--;
    targetTweetObj.isRetweeted = false;
  }
  render();
}

function getFeedHtml() {
  let feedHtml = "";
  tweetsData.forEach(function (tweet) {
    let likeIconClass = "";
    if (tweet.isLiked) {
      likeIconClass = "liked";
    }

    let retweetIconClass = "";
    if (tweet.isRetweeted) {
      retweetIconClass = "retweeted";
    }

    let repliesHtml = "";
    if (tweet.replies.length > 0) {
      tweet.replies.forEach(function (replie) {
        repliesHtml += `
        <div class="tweet-reply">
        <div class="tweet-inner">
            <img src="${replie.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${replie.handle}</p>
                    <p class="tweet-text">${replie.tweetText}</p>
                </div>
            </div>
        </div>`;
      });
    }

    feedHtml += `
        <div class="tweet">
        <div class="tweet-inner">
            <img src="${tweet.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${tweet.handle}</p>
                <p class="tweet-text">${tweet.tweetText}</p>
                <div class="tweet-details">
                    <span class="tweet-detail">
                        <i class="fa-regular fa-comment-dots" data-replies="${tweet.uuid}"></i>
                        ${tweet.replies.length}
                    </span>
                    <span class="tweet-detail">
                        <i class="fa-solid fa-heart ${likeIconClass}" data-likes="${tweet.uuid}"></i>
                        ${tweet.likes}
                    </span>
                    <span class="tweet-detail">
                        <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweets="${tweet.uuid}"></i>
                        ${tweet.retweets}
                    </span>
                </div>   
            </div>            
        </div>
        <div id="replies-${tweet.uuid}">
            ${repliesHtml}
        </div>
    </div>
    `;
  });
  return feedHtml;
}

function render() {
  document.getElementById("feed").innerHTML = getFeedHtml();
}

render();
