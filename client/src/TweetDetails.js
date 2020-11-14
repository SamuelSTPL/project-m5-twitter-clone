import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { HomeFeedContext } from "./Global/HomeFeedContext";
import { TweetActions } from "./Global/TweetActions";
import styled from "styled-components";
import moment from "moment";

export const TweetDetails = () => {
  let { tweetId } = useParams();
  const { homeFeed } = useContext(HomeFeedContext);

  if (homeFeed) {
    const singleTweet = homeFeed[tweetId];

    const newTimestamp = moment(singleTweet.timestamp).format("hh:mma MMM DD");

    return (
      <>
        {singleTweet && (
          <TweetDetailsWrapper>
            <AvatarImg
              src={singleTweet.author.avatarSrc}
              alt="Author of the Tweet"
            />
            <ContentWrapper>
              <NameHandleDateWrapper>
                <UserName>{singleTweet.author.displayName}</UserName>
                <Handle>@{singleTweet.author.handle}</Handle>
                {newTimestamp}
              </NameHandleDateWrapper>
              <Status>{singleTweet.status}</Status>
              {singleTweet.media[0] && (
                <MediaImg
                  src={singleTweet.media[0].url}
                  alt="Uploaded by the user"
                />
              )}
              <TweetActions tweet={singleTweet} />
            </ContentWrapper>
          </TweetDetailsWrapper>
        )}
      </>
    );
  }
  return <div>Loading...</div>;
};

const TweetDetailsWrapper = styled.div`
  display: flex;
  margin-top: 15px;
  padding: 15px;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;

const AvatarImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const NameHandleDateWrapper = styled.div`
  font-size: 1.5rem;
  color: gray;
`;

const UserName = styled.span`
  color: black;
  font-size: 2rem;
  font-weight: bolder;
  margin-right: 20px;
`;

const Handle = styled.span`
  margin-right: 20px;
`;

const Status = styled.div`
  margin-top: 20px;
  font-size: 1.3rem;
`;

const MediaImg = styled.img`
  border-radius: 20px;
  margin-top: 20px;
`;
