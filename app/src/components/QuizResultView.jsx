import React, { memo } from "react";
import { useLocation } from "wouter";
import { getQuizXp } from "../shared";

import Button from "../components/Button";
import PieChart from "../components/PieChart";
import ProgressBar from "./ProgressBar";

import { Rating } from "react-simple-star-rating";

function QuizResultView(props) {
  const { quiz, rightAnswers, onChangeTextRating, onChangeRating, rating } = props;

  const [, setLocation] = useLocation();
  const totalQuestions = quiz.questions.length;
  const hitsInDecimalPercentage = rightAnswers / totalQuestions;
  const xpObtained = (getQuizXp(quiz) * hitsInDecimalPercentage).toFixed();

  return (
    <>
      <h2 className="text-2xl w-full text-center mb-5 text-white uppercase tracking-wider">
        Você concluiu o quiz 🎉
      </h2>

      <p>Você acertou {(hitsInDecimalPercentage * 100).toFixed(1)}% das questões.</p>

      <div className="w-full max-w-xs mx-auto mt-2">
        <PieChart
          data={{
            labels: ["Respostas corretas", "Respostas incorretas"],
            values: [rightAnswers, totalQuestions - rightAnswers],
          }}
        />
      </div>

      <div className="w-full max-w-lg text-center text-white text-xl">
        <p>Obteve {xpObtained} de experiência!</p>

        <div className="flex justify-center mb-4">
          <ProgressBar />
        </div>

        <div className="flex flex-col mb-6">
          <span className="font-semibold pb-2">Deixe sua avaliação</span>
          <Rating
            className="mt-1 mb-2"
            onClick={onChangeRating}
            ratingValue={rating}
            fillColor={"#FFBF00"}
            size={35}
          />
          <textarea
            id="text-rating"
            placeholder="Digite um comentário ao professor a respeito do quiz"
            className="text-black p-2 rounded-md text-base"
            onChange={onChangeTextRating}
          />
        </div>

        <Button width="full" color="green" onClick={() => setLocation("/home")}>
          Escolher outro quiz
        </Button>
      </div>
    </>
  );
}

export default memo(QuizResultView);
