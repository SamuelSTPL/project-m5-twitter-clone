import styled from "styled-components";
import { NewTweet } from "./NewTweet";
import { TweetFeeds } from "./TweetFeeds";

const Wrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
`;

export const HomeFeed = () => {
  return (
    <Wrapper>
      <NewTweet />
      <TweetFeeds />
    </Wrapper>
  );
};
