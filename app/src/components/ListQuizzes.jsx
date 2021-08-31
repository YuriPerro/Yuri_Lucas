import React, { useMemo } from "react";
import { useLocation } from "wouter";
import { useStore } from "../store";
import Card from "./Card";

export const ListQuizzes = ({ categorie }) => {
  const [, setLocation] = useLocation();
  const { quizzes, user } = useStore();

  const quizzesFiltered = useMemo(() => {
    return quizzes.filter((quiz) => quiz.categorie === categorie);
  }, [categorie, quizzes]);

  const getQuizAcomplished = (quizId) => {
    const acomplisheds = user.acomplishedQuizzes;
    if (acomplisheds) {
      const filtered = acomplisheds.filter((obj) => obj.quizId === quizId);
      if (filtered.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const getTextDetails = (quizId) => {
    const acomplished = getQuizAcomplished(quizId);
    const acomplishedList = user.acomplishedQuizzes;

    if (acomplished) {
      const filtered = acomplishedList.filter((obj) => obj.quizId === quizId);
      if (filtered.length > 0) {
        const countRightAnswer = filtered[0].rightAnswersCount;
        const countTotal = filtered[0].totalQuestions;

        return `${countRightAnswer}/${countTotal}`;
      }
    }
  };

  const onClickCard = (quizId) => {
    const isAcomplished = getQuizAcomplished(quizId);
    if (isAcomplished) {
      alert("Ops parece q vc ja realizou esse quiz.");
    } else {
      setLocation(`/quiz/${quizId}`);
    }
  };

  return (
    <section className="mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {quizzesFiltered.length ? (
          quizzesFiltered.map((quiz, index) => (
            <Card
              data-test={quiz.id}
              key={quiz.id}
              quiz={quiz}
              onClick={() => onClickCard(quiz.id)}
              footer={`Criador por ${quiz.createdBy}`}
              hoverEffect={true}
              isAcomplished={getQuizAcomplished(quiz.id)}
              detailsAcomplished={getTextDetails(quiz.id)}
            />
          ))
        ) : (
          <p>Não há cards criados para essa categoria</p>
        )}
      </div>
    </section>
  );
};
