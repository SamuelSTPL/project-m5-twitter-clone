import React, { createContext, useEffect, useState } from "react";

export const CurrentUserContext = createContext(null);

export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [status, setStatus] = useState("loading");
  const [hasEncounteredIternalError, setHasEncounteredIternalError] = useState(
    false
  );

  const fetchUserData = async () => {
    try {
      const response = await fetch(`/api/me/profile`);
      const data = await response.json();
      // console.log(response);
      setCurrentUser(data.profile);
      setStatus("idle");
      if (response.status === 200) {
        setHasEncounteredIternalError(false);
      }
    } catch (error) {
      console.log(error);
      setHasEncounteredIternalError(true);
    }
  };

  // console.log(hasEncounteredIternalError);
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        status,
        setHasEncounteredIternalError,
        hasEncounteredIternalError,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
