import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "wouter";
import { useStore } from "../store";
import Card from "./Card";

export const ListQuizzes = ({ categorie }) => {
  const [, setLocation] = useLocation();
  const { quizzes, user } = useStore();

  const [quizAcomplished, setQuizAcomplished] = useState(false);

  const quizzesFiltered = useMemo(() => {
    return quizzes.filter((quiz) => quiz.categorie === categorie);
  }, [categorie, quizzes]);

  const getQuizAcomplished = (quizId) => {
    const acomplisheds = user.acomplishedQuizzes;
    if (acomplisheds) {
      const filtered = acomplisheds.filter((id) => id === quizId);
      if (filtered.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
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
          quizzesFiltered.map((quiz) => (
            <Card
              key={quiz.id}
              quiz={quiz}
              isAcomplished={getQuizAcomplished(quiz.id)}
              onClick={() => onClickCard(quiz.id)}
              footer={`Criador por ${quiz.createdBy}`}
            />
          ))
        ) : (
          <p>Não há cards criados para essa categoria</p>
        )}
      </div>
    </section>
  );
};
