import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { API } from "../api/services";
import Card from "./Card";

export const ListQuizzes = ({ categorie }) => {
  const [, setLocation] = useLocation();
  const [quizes, setQuizes] = useState([]);

  useEffect(() => {
    async function getQuizes() {
      const resp = await API.getQuizByCategorie(categorie);
      if (resp) setQuizes(Object.values(resp));
    }

    getQuizes();
  }, []);

  return (
    <section className="mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {quizes.length ? (
          quizes.map((quiz, i) => (
            <Card
              key={i}
              onClick={() => setLocation(`/quiz/${i}`)}
              title={quiz.title}
              description={quiz.description}
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
