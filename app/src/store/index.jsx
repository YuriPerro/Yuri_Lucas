import React, { createContext, useState, useContext, useEffect } from "react";
import { API } from "../api/services";
import { getQuizXp, getXpToLevelUp } from "../shared";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsisFetching] = useState(true);
  const [user, setUser] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [students, setStudents] = useState([]);

  function setLoading(value) {
    if (value) setIsLoading(value);
    else setTimeout(() => setIsLoading(value), 500);
  }

  function addToUserXp(quiz, rightAnswersCount) {
    if (!user || !quiz) {
      console.log("Não foi possivel addToUserXp!");
      return;
    }

    const totalQuestions = quiz.questions.length;
    const hitsInDecimalPercentage = rightAnswersCount / totalQuestions;
    const xpObtained = Number((getQuizXp(quiz) * hitsInDecimalPercentage).toFixed(1));

    const newUserState = { ...user };
    newUserState.xp = newUserState.xp + xpObtained;
    const xpToLevelUp = getXpToLevelUp(newUserState.level);
    if (newUserState.xp >= xpToLevelUp) {
      console.log("New up");
      newUserState.level++;
      newUserState.xp = newUserState.xp - xpToLevelUp;
    }

    API.updateUserXpLevel(Number(newUserState.xp.toFixed(1)), newUserState.level, user.uid);
    API.addAcomplishedQuiz(quiz.id, user.uid, rightAnswersCount, totalQuestions);

    setUser(newUserState);
  }

  async function fetchInitialData() {
    setIsisFetching(true);
    const [dataQuizzes, dataCategories, dataStudents] = await Promise.all([
      API.getAllQuizzes(),
      API.getAllCategories(),
      API.getStudents(),
    ]);
    if (dataCategories) setCategories(Object.values(dataCategories));
    if (dataQuizzes) setQuizzes(Object.values(dataQuizzes));
    if (dataStudents) setStudents(Object.values(dataStudents));

    setTimeout(() => setIsisFetching(false), 200);
  }

  function fetchUser() {
    return API.auth.onAuthStateChanged((user) => {
      if (user) {
        API.singleUserRef(user.uid).on("value", (data) => {
          const userDB = data.val();

          if (userDB) {
            const isAdmin = userDB.isAdmin ? true : false;
            setUser({ isAdmin, ...userDB });
          }
        });
      }
    });
  }

  useEffect(() => {
    fetchUser();
    fetchInitialData();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        user,
        setUser,
        addToUserXp,
        isFetching,
        isLoading,
        setLoading,
        quizzes,
        categories,
        students,
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
