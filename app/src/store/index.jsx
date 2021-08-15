import React, { createContext, useState, useContext, useEffect } from "react";
import { API } from "../api/services";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsisFetching] = useState(true);
  const [user, setUser] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);

  function setLoading(value) {
    if (value) setIsLoading(value);
    else setTimeout(() => setIsLoading(value), 500);
  }

  async function fetchInitialData() {
    setIsisFetching(true);
    const [dataQuizzes, dataCategories] = await Promise.all([
      API.getAllQuizes(),
      API.getAllCategories(),
    ]);
    if (dataCategories) setCategories(Object.values(dataCategories));
    if (dataQuizzes) setQuizzes(Object.values(dataQuizzes));

    setTimeout(() => setIsisFetching(false), 200);
  }

  function addUserXp(newXp) {
    if (!user) return;

    const newUserState = { ...user };
    const xpToLevelUp = newUserState.level * 500;
    newUserState.xp = newUserState.xp + newXp;
    if (newUserState.xp >= xpToLevelUp) {
      console.log("New up");
      newUserState.level++;
      newUserState.xp = newUserState.xp - xpToLevelUp;
    }
    setUser(newUserState);
  }

  useEffect(() => fetchInitialData(), []);

  return (
    <StoreContext.Provider
      value={{
        user,
        setUser,
        addUserXp,
        isFetching,
        isLoading,
        setLoading,
        quizzes,
        categories,
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
