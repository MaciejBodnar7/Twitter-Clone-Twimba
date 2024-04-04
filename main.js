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
  }
});

function handleLikeClick(tweetId) {
  // test if uuid from tweetData is the same from click
  const targetTweetObj = tweetsData.filter(function (tweet) {
    return tweet.uuid === tweetId;
    //if that true element will be save to targetTweetObj
  })[0]; //save position 0 of array (it only have one index anyway)

  targetTweetObj.likes++;
  console.log(targetTweetObj);
}

// forEach() LOOP over tweetsData, saving innnerHtml in feedHtml
let feedHtml = "";

function getFeedHtml() {
  tweetsData.forEach(function (tweet) {
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
                        <i class="fa-solid fa-heart" data-likes="${tweet.uuid}"></i>
                        ${tweet.likes}
                    </span>
                    <span class="tweet-detail">
                        <i class="fa-solid fa-retweet" data-retweet="${tweet.uuid}"></i>
                        ${tweet.retweets}
                    </span>
                </div>   
            </div>            
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
