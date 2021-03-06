import React, { useContext } from "react";
import styled from "styled-components";
import { CurrentUserContext } from "./Global/CurrentUserContext";
import { HomeFeedContext } from "./Global/HomeFeedContext";
import { COLORS } from "./Global/constants";
import { Icon } from "react-icons-kit";
import { u1F63F } from "react-icons-kit/noto_emoji_regular/u1F63F";

export const NewTweet = () => {
  const { currentUser } = useContext(CurrentUserContext);

  const {
    remainingLetters,
    handleTweetTextChange,
    handleSubmit,
    setTweetText,
    tweetText,
    setRemainingLetters,
    tweetPostError,
  } = useContext(HomeFeedContext);

  // console.log(tweetPostError);
  return (
    <NewTweetContainer
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
        setTweetText("");
        setRemainingLetters(280);
        e.target.value = "";
      }}
    >
      <AvatarImg src={currentUser.avatarSrc} />
      <Input
        placeholder="What's happening?"
        onChange={handleTweetTextChange}
        aria-label="Enter new tweet text here"
        value={tweetText}
      />
      <Bottom>
        <Span remainingLetters={remainingLetters}>{remainingLetters}</Span>
        <Button
          type="submit"
          value="Meow"
          aria-label="Send new tweet"
          disabled={remainingLetters <= 0 ? true : false}
        />
      </Bottom>
      {tweetPostError && (
        <ErrorDiv>
          <ErrorIconSpan>
            <Icon icon={u1F63F} size={50} />
          </ErrorIconSpan>
          We encountered a problem when trying to post your tweet. Please try
          again!
        </ErrorDiv>
      )}
    </NewTweetContainer>
  );
};

const NewTweetContainer = styled.form`
  margin-top: 15px;
  position: relative;
  border: 1px solid lightgray;
  width: 100%;
  min-height: 200px;
`;

const AvatarImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
  left: 10px;
  top: 30px;
`;

const Input = styled.textarea`
  margin-left: 110px;
  border: 0px;
  font-size: 1.5rem;
  width: 90%;
  height: 120px;
  outline: none;
  resize: none;
`;

const Bottom = styled.div`
  position: absolute;
  right: 10px;
  top: 130px;
`;

const Button = styled.input`
  color: white;
  background-color: ${(prop) =>
    !prop.disabled ? COLORS.primary : COLORS.hover};
  border: 0px;
  font-size: 1.5rem;
  font-weight: bolder;
  border-radius: 25px;
  width: 100px;
  height: 50px;
`;

const Span = styled.span`
  color: lightgray;
  margin-right: 20px;
  color: ${(prop) =>
    prop.remainingLetters >= 55
      ? "#A9A9A9"
      : prop.remainingLetters > 0
      ? "#CCCC00"
      : "#8B0000"};
`;

const ErrorDiv = styled.div`
  margin-top: 70px;
  text-align: center;
  font-size: 1.3rem;
`;

const ErrorIconSpan = styled.span`
  color: #8b0000;
`;
