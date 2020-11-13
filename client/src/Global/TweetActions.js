import React, { useContext, useState } from "react";
import { FiHeart, FiMessageCircle, FiUpload } from "react-icons/fi";
import { AiOutlineRetweet } from "react-icons/ai";
import styled from "styled-components";
import { COLORS } from "./constants";
import { HomeFeedContext } from "../Global/HomeFeedContext";

const handleMessageClicked = () => {};

const handleRetweetClicked = async (tweet) => {
  if (!tweet) return;
  await fetch(`/api/tweet/${tweet.id}/retweet`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ retweet: !tweet.isRetweeted }),
  });
};

const handleMUploadClicked = () => {};

export const TweetActions = ({ tweet }) => {
  const { homeFeed } = useContext(HomeFeedContext);
  // console.log(tweet);
  const [isLike, setIsLike] = useState({
    like: tweet ? tweet.isLiked : false,
    likeCount: tweet ? Number(tweet.numLikes) : 0,
  });

  const handleLikesClicked = async () => {
    if (!tweet) return;
    await fetch(`/api/tweet/${tweet.id}/like`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ like: !isLike.like }),
    });
    setIsLike({
      like: !isLike.like,
      likeCount: !isLike.like ? isLike.likeCount + 1 : isLike.likeCount - 1,
    });
  };

  if (homeFeed && tweet) {
    return (
      <Wrapper>
        <div>
          <IconButtonMessage
            onClick={(e) => handleMessageClicked()}
            aria-label="Enter new message"
          >
            <Span>
              <FiMessageCircle />
            </Span>
          </IconButtonMessage>
        </div>
        <div>
          <IconButtonRetweet
            onClick={(e) => {
              e.stopPropagation();
              handleRetweetClicked(tweet);
            }}
            aria-label="Retweet post"
          >
            <Span>
              <AiOutlineRetweet />
            </Span>
            {tweet.numRetweets}
          </IconButtonRetweet>
        </div>
        <div>
          <IconButtonHeart
            onClick={(e) => {
              e.stopPropagation();
              handleLikesClicked();
            }}
            aria-label="Like the post"
          >
            <HeartIcon isLike={isLike}>
              <FiHeart />
            </HeartIcon>
            {isLike.likeCount}
            {/* Check isLike.like to color the heart */}
          </IconButtonHeart>
        </div>
        <div>
          <IconButtonUpload
            onClick={(e) => handleMUploadClicked()}
            aria-label="Save the post"
          >
            <Span>
              <FiUpload />
            </Span>
          </IconButtonUpload>
        </div>
      </Wrapper>
    );
  }
  return <div>Loading...</div>;
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 15px;
`;

const IconButton = styled.button`
  border: 0px;
  border-radius: 50%;
  background-color: white;
  padding: 5px;
  &:hover {
    cursor: pointer;
  }
`;

const IconButtonMessage = styled(IconButton)`
  &:hover {
    background-color: ${COLORS.hover};
  }
`;
const IconButtonRetweet = styled(IconButton)`
  &:hover {
    background-color: lightgray;
  }
`;
const IconButtonHeart = styled(IconButton)`
  &:hover {
    background-color: #ffb3b3;
  }
`;
const IconButtonUpload = styled(IconButton)`
  &:hover {
    background-color: ${COLORS.hover};
  }
`;

const Span = styled.span`
  font-size: 1.7rem;
  margin: auto;
`;

const HeartIcon = styled(Span)`
  color: ${(prop) => (prop.isLike.like ? "red" : undefined)};
`;
