import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
console.log(uuidv4()); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

const tweetInput = document.getElementById("tweet-input");

document.addEventListener("click", function (e) {
  if (e.target.dataset.likes) {
    const uuidOfLike = e.target.dataset.likes;
    handleLikeClick(uuidOfLike);
  } else if (e.target.dataset.retweets) {
    const uuidOfRetweets = e.target.dataset.retweets;
    handleRetweetClick(uuidOfRetweets);
  } else if (e.target.dataset.replies) {
    handleReplyClikc(e.target.dataset.replies);
  } else if (e.target.id === "tweet-btn") {
    handleTweetBtnClick();
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

function handleReplyClikc(replyId) {
  const replyDiv = document.getElementById(`replies-${replyId}`);
  replyDiv.classList.toggle("hidden");
}

function handleTweetBtnClick() {
  console.log(tweetInput.value);

  tweetsData.push({
    handle: `@SrimbaGuy`,
    profilePic: `images/scrimbalogo.png`,
    likes: 0,
    retweets: 0,
    tweetText: tweetInput.value,
    replies: [],
    isLiked: false,
    isRetweeted: false,
    uuid: uuidv4(),
  });

  render();

  tweetInput.value = "";
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
        <div class="hidden" id="replies-${tweet.uuid}">
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
