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
  const [didLevelUp, setDidLevelUp] = useState(false);

  function setLoading(value) {
    if (value) setIsLoading(value);
    else setTimeout(() => setIsLoading(value), 500);
  }

  function addToUserXp(quiz, rightAnswersCount, textRating) {
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
      setDidLevelUp(true);
      newUserState.level++;
      newUserState.xp = newUserState.xp - xpToLevelUp;
    }

    API.updateUserXpLevel(Number(newUserState.xp.toFixed(1)), newUserState.level, user.uid);
    API.addAcomplishedQuiz(quiz.id, user.uid, rightAnswersCount, totalQuestions);
    if (textRating.length > 0) {
      API.setRatingQuiz(textRating);
    }

    setUser(newUserState);
  }

  async function fetchInitialData() {
    setIsisFetching(true);
    const [dataCategories, dataStudents] = await Promise.all([
      API.getAllCategories(),
      API.getStudents(),
    ]);
    if (dataCategories) setCategories(Object.values(dataCategories));
    if (dataStudents) {
      const normalizedStudents = Object.values(dataStudents).map((student) => ({
        ...student,
        isFriend: false,
      }));
      setStudents(normalizedStudents);
    }

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

  const getAllQuizzes = async () => {
    return API.database.ref("quizes/").once("value", (data) => {
      const dataQuizzes = data.val();

      if (dataQuizzes) {
        setQuizzes(Object.values(dataQuizzes));
      }
    });
  };

  useEffect(() => {
    fetchUser();
    fetchInitialData();
    getAllQuizzes();
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
        setStudents,
        setQuizzes,
        didLevelUp,
        setDidLevelUp,
        getAllQuizzes,
      }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  return { ...context };
}
