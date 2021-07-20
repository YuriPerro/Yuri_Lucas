import React, { useMemo } from "react";
import { useLocation } from "wouter";
import { useStore } from "../store";
import Card from "./Card";

export const ListQuizzes = ({ categorie }) => {
  const [, setLocation] = useLocation();
  const { quizzes } = useStore();

  const quizzesFiltered = useMemo(() => {
    return quizzes.filter((quiz) => quiz.categorie === categorie);
  }, [categorie, quizzes]);

  return (
    <section className="mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {quizzesFiltered.length ? (
          quizzesFiltered.map((quiz) => (
            <Card
              key={quiz.id}
              onClick={() => setLocation(`/quiz/${quiz.id}`)}
              title={quiz.title}
              description={quiz.description}
              difficulty={quiz.difficulty}
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
