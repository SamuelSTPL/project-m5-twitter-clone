import React, { useContext } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { HomeFeed } from "./HomeFeed";
import { Notifications } from "./Notifications";
import { Bookmarks } from "./Bookmarks";
import { TweetDetails } from "./TweetDetails";
import { Profile } from "./Profile";
import { Sidebar } from "./Sidebar";
import { CurrentUserContext } from "./Global/CurrentUserContext";
import { Loading } from "./Global/Loading";
import GlobalStyle from "./Global/GlobalStyles";
import styled from "styled-components";
import { Icon } from "react-icons-kit";
import { u1F63F } from "react-icons-kit/noto_emoji_regular/u1F63F";

const Wrapper = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
`;

const SidebarWrapper = styled.div`
  width: 20%;
`;

const LoadingDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

function App() {
  const { currentUser, status, hasEncounteredIternalError } = useContext(
    CurrentUserContext
  );

  // console.log(currentUser, status);
  // if (hasEncounteredIternalError) {
  //   return (
  //     <div>
  //       <Icon icon={u1F63F} />
  //       <h1>An error has occurred</h1>
  //       <p>Please refresh the page</p>
  //     </div>
  //   );

  return (
    <Router>
      <GlobalStyle />
      <Wrapper>
        <SidebarWrapper>
          <Sidebar />
        </SidebarWrapper>
        {!currentUser && status === "loading" && !hasEncounteredIternalError ? (
          <LoadingDiv>
            <Loading width={150} />
          </LoadingDiv>
        ) : hasEncounteredIternalError ? (
          <div>
            <Icon icon={u1F63F} />
            <h1>An error has occurred</h1>
            <p>Please refresh the page</p>
          </div>
        ) : (
          <Switch>
            <Route exact path="/">
              <HomeFeed />
            </Route>
            <Route path="/notifications">
              <Notifications />
            </Route>
            <Route path="/bookmarks">
              <Bookmarks />
            </Route>
            <Route path="/tweet/:tweetId">
              <TweetDetails />
            </Route>
            <Route path="/:profileId">
              <Profile />
            </Route>
          </Switch>
        )}
      </Wrapper>
    </Router>
  );
}

export default App;
