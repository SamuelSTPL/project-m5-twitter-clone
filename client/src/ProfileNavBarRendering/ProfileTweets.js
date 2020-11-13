import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TweetActions } from "../Global/TweetActions";

const Wrapper = styled.div`
  display: flex;
  padding: 25px;
  width: 100%;
  border: 1px solid lightgray;
`;

const Img = styled.img`
  max-width: 100%;
  border-radius: 20px;
`;

const AvatarImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Content = styled.div`
  width: 100%;
`;
const Top = styled.div``;

export const ProfileTweets = ({ profileId }) => {
  const [listOfTweets, setListOfTweets] = useState(null);

  const fetchListOfTweetsFromUser = async () => {
    try {
      const response = await fetch(`/api/${profileId}/feed`);
      const data = await response.json();
      //   console.log(data);
      setListOfTweets(data.tweetsById);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchListOfTweetsFromUser();
  }, []);
  //   console.log(listOfTweets);

  if (listOfTweets) {
    return Object.keys(listOfTweets).map((tweetId) => {
      const tweet = listOfTweets[tweetId];
      return (
        <Wrapper>
          <AvatarImg
            src={tweet.author.avatarSrc}
            alt="The picture of the author of the tweet"
          />
          <Content>
            <Top>
              <span>{tweet.author.displayName}</span>

              <p>@{tweet.author.handle}</p>
              <p>{tweet.timestamp}</p>
            </Top>
            <h4>{tweet.status}</h4>
            {tweet.media[0] && <Img src={tweet.media[0].url} />}
            <TweetActions tweet={tweet} />
          </Content>
        </Wrapper>
      );
    });
  } else {
    return <div>Loading...</div>;
  }
};
