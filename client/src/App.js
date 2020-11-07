import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { HomeFeed } from "./HomeFeed";
import { Notifications } from "./Notifications";
import { Bookmarks } from "./Bookmarks";
import { TweetDetails } from "./TweetDetails";
import { Profile } from "./Profile";
import { Sidebar } from "./Sidebar";
import GlobalStyle from "./Global/GlobalStyles";
import styled from "styled-components";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Wrapper>
        <Sidebar />
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
      </Wrapper>
    </Router>
  );
}

const Wrapper = styled.div`
  display: flex;
`;

export default App;
