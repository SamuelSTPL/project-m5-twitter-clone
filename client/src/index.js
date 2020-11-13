import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { CurrentUserProvider } from "./Global/CurrentUserContext";
import { HomeFeedProvider } from "./Global/HomeFeedContext";

ReactDOM.render(
  <CurrentUserProvider>
    <HomeFeedProvider>
      <App />
    </HomeFeedProvider>
  </CurrentUserProvider>,
  document.getElementById("root")
);
