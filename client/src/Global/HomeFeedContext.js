import React, { createContext, useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

export const HomeFeedContext = createContext(null);

export const HomeFeedProvider = ({ children }) => {
  const {
    setHasEncounteredIternalError,
    hasEncounteredIternalError,
  } = useContext(CurrentUserContext);
  const [tweetIds, setTweetIds] = useState(null);
  const [homeFeed, setHomeFeed] = useState(null);
  const [tweetText, setTweetText] = useState("");
  const [remainingLetters, setRemainingLetters] = useState(280);
  const [tweetPostError, setTweetPostError] = useState(false);

  // console.log(homeFeed);
  // Handle the onChange function for the New Tweet text
  const handleTweetTextChange = (event) => {
    setTweetText(event.target.value);
    setRemainingLetters(280 - event.target.value.length);
  };
  // Post new Tweet
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/tweet", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: tweetText }),
      });
      console.log(response);
      if (response.ok) {
        await fetchHomeFeedData();
        setTweetPostError(false);
        setTweetText("");
        setRemainingLetters(280);
      } else {
        setTweetPostError(true);
        // console.log(response.status, response.statusText, response.url);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(tweetPostError);

  //Fetch the home feed data
  const fetchHomeFeedData = async () => {
    try {
      const response = await fetch("/api/me/home-feed");
      const data = await response.json();
      setHomeFeed(data.tweetsById);
      setTweetIds(data.tweetIds);
    } catch (error) {
      console.log(error);
      setHasEncounteredIternalError(true);
    }
  };

  useEffect(() => {
    fetchHomeFeedData();
  }, []);

  return (
    <HomeFeedContext.Provider
      value={{
        homeFeed,
        setHomeFeed,
        setTweetText,
        tweetText,
        setRemainingLetters,
        remainingLetters,
        handleTweetTextChange,
        tweetIds,
        handleSubmit,
        hasEncounteredIternalError,
        tweetPostError,
      }}
    >
      {children}
    </HomeFeedContext.Provider>
  );
};
