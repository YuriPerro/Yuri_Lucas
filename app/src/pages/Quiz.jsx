import React, { useState, useMemo } from "react";
import { quizzes } from "../api/quizzes";

import Button from "../components/Button";
import QuizOption from "../components/QuizOption";

function Quiz(props) {
  const quiz = quizzes[props.quizIndex];

  const [showResult, setShowResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedResult, setSelectedResult] = useState(false);

  function selectOption(optionIndex) {
    if (quiz.questions[currentQuestionIndex].answerIndex === optionIndex) setSelectedResult(true);
    else setSelectedResult(false);

    setShowResult(true);
  }

  function getOptionStatus(optionIndex) {
    if (!showResult) return null;
    return `${optionIndex === quiz.questions[currentQuestionIndex].answerIndex}`;
  }

  function nextQuestion() {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowResult(false);
    }
    // else{} vai pra tela final de resultado do quiz
  }

  const backgroundFeedback = useMemo(() => {
    if (!showResult) return "to-gray-500";
    return selectedResult ? "to-green-500" : "to-red-600";
  }, [showResult, selectedResult]);

  return (
    <div
      className={`min-h-screen w-full transition-all flex flex-col items-center p-8 bg-gradient-to-b from-gray-600 ${backgroundFeedback}`}>
      <header className="flex justify-between mb-14">
        <h1 className="text-4xl font-bold">{quiz.title}</h1>
      </header>

      <main className="flex flex-col w-full items-center">
        <h2 className="text-2xl w-full text-center mb-5 text-gray-200 font-bold">
          <span className="block mb-4 uppercase font-normal tracking-wider">
            Pergunta ({currentQuestionIndex + 1}/{quiz.questions.length})
          </span>
          {quiz.questions[currentQuestionIndex].title}
        </h2>

        <ul className="flex flex-col justify-center mb-5 w-full max-w-lg">
          {quiz.questions[currentQuestionIndex].options.map((option, i) => (
            <QuizOption
              key={i}
              option={option}
              status={getOptionStatus(i)}
              onClick={() => selectOption(i)}
            />
          ))}
        </ul>

        {showResult && (
          <>
            <span className=" text-white text-2xl rounded-lg p-4 mb-4">
              {selectedResult ? "Resposta certa !" : " Resposta errada !"}
            </span>
            <Button color="blue" onClick={nextQuestion} className="">
              Proxima pergunta
            </Button>
          </>
        )}
      </main>
    </div>
  );
}

export default Quiz;
