import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { HomeFeedContext } from "./Global/HomeFeedContext";
import { TweetActions } from "./Global/TweetActions";

export const TweetDetails = () => {
  let { tweetId } = useParams();
  const { homeFeed } = useContext(HomeFeedContext);

  if (homeFeed) {
    const singleTweet = homeFeed[tweetId];
    return (
      <>
        {singleTweet && (
          <div>
            <img src={singleTweet.author.avatarSrc} alt="Author of the Tweet" />
            <div>
              <div>
                {singleTweet.author.displayName}@{singleTweet.author.handle}
                {singleTweet.timestamp}
              </div>
              {singleTweet.status}
              {singleTweet.media[0] && (
                <img
                  src={singleTweet.media[0].url}
                  alt="Uploaded by the user"
                />
              )}
              <TweetActions tweet={singleTweet} />
            </div>
          </div>
        )}
      </>
    );
  }
  return <div>Loading...</div>;
};
