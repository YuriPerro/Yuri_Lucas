import React from "react";
import { useLocation } from "wouter";

import Button from "../components/Button";
import PieChart from "../components/PieChart";

function QuizResultView(props) {
  const { totalQuestions, rightAnswers, startAnotherAttempt, attempts } = props;
  const [, setLocation] = useLocation();

  return (
    <>
      <h2 className="text-2xl w-full text-center mb-5 text-white uppercase tracking-wider">
        Você concluiu o quiz 🎉
      </h2>

      <PieChart
        data={{
          labels: ["Corretas", "Erradas"],
          values: [rightAnswers, totalQuestions - rightAnswers],
        }}
      />

      <div className="w-full max-w-lg text-center text-white text-xl">
        <p className="mb-8">
          Você acertou {rightAnswers} de {totalQuestions} perguntas!
        </p>
        {attempts < 2 && (
          <Button width="full" color="gray" className="mb-4" onClick={startAnotherAttempt}>
            Tentar novamente
          </Button>
        )}
        <Button width="full" color="green" onClick={() => setLocation("/home")}>
          Escolher outro quiz
        </Button>
      </div>
    </>
  );
}

export default QuizResultView;
