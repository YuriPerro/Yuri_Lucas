import React, { createContext, useState, useContext } from "react";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [quizzes, setQuizzes] = useState([]);

  function setLoading(value) {
    if (value) setIsLoading(value);
    else setTimeout(() => setIsLoading(value), 500);
  }

  return (
    <StoreContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        setLoading,
        quizzes,
        setQuizzes,
      }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  return { ...context };
}
