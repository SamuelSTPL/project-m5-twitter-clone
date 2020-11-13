import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { HomeFeedContext } from "./Global/HomeFeedContext";
import { TweetActions } from "./Global/TweetActions";
import { Loading } from "./Global/Loading";
import { Icon } from "react-icons-kit";
import { u1F63F } from "react-icons-kit/noto_emoji_regular/u1F63F";

export const TweetFeeds = () => {
  const { homeFeed, hasEncounteredIternalError } = useContext(HomeFeedContext);
  let history = useHistory();

  const handleTweetClick = (id) => {
    history.push(`tweet/${id}`);
  };

  const handleUserNameClick = (id) => {
    history.push(`/${id}`);
  };

  // console.log(hasEncounteredIternalError);
  //   console.log(homeFeed);
  if (hasEncounteredIternalError) {
    return (
      <div>
        <Icon icon={u1F63F} />
        <h1>An error has occurred</h1>
        <p>Please refresh the page</p>
      </div>
    );
  }
  if (homeFeed) {
    return Object.keys(homeFeed)
      .reverse()
      .map((tweetId) => {
        const tweet = homeFeed[tweetId];
        if (!tweet) return;
        return (
          <Wrapper
            tabIndex="0"
            key={tweet.id}
            onClick={(e) => {
              handleTweetClick(tweetId);
            }}
          >
            <AvatarImg src={tweet.author.avatarSrc} alt="Author of the tweet" />
            <Content>
              <Top>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUserNameClick(tweet.author.handle);
                  }}
                  aria-label="Link to user profile    "
                >
                  <DisplayName>{tweet.author.displayName}</DisplayName>
                </button>
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
  }
  //Add loader Icon
  return (
    <LoadingIcon>
      <Loading width={80} />;
    </LoadingIcon>
  );
};

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

const DisplayName = styled.span`
  font-size: 1.5rem;
  font-weight: bolder;
`;

const Content = styled.div`
  width: 100%;
`;
const Top = styled.div``;

const LoadingIcon = styled.div`
  margin-top: 50px;
`;
