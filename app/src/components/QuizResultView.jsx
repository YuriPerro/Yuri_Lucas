import React from "react";
import { useLocation } from "wouter";
import { quizDifficultyXp } from "../@constants";

import Button from "../components/Button";
import PieChart from "../components/PieChart";
import ProgressBar from "./ProgressBar";

function QuizResultView(props) {
  const { totalQuestions, rightAnswers, startAnotherAttempt, attempts, difficulty } = props;
  const [, setLocation] = useLocation();

  const hitsInDecimalPercentage = rightAnswers / totalQuestions;
  const xpObtained = (quizDifficultyXp[difficulty] * hitsInDecimalPercentage).toFixed(1);

  return (
    <>
      <h2 className="text-2xl w-full text-center mb-5 text-white uppercase tracking-wider">
        Você concluiu o quiz 🎉
      </h2>
      <div className="w-full max-w-xs mx-auto">
        <PieChart
          data={{
            labels: ["Respostas corretas", "Respostas incorretas"],
            values: [rightAnswers, totalQuestions - rightAnswers],
          }}
        />
      </div>

      <div className="w-full max-w-lg text-center text-white text-xl">
        <p>Você acertou {(hitsInDecimalPercentage * 100).toFixed(1)}% das perguntas!</p>
        <p>E obteve {xpObtained} de experiencia!</p>
        <div className="flex justify-center mb-4">
          <ProgressBar />
        </div>

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
