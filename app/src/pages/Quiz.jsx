import React, { useState, useMemo } from "react";
import Button from "../components/Button";
import QuizOption from "../components/QuizOption";
import QuizResultView from "../components/QuizResultView";
import LevelUpOverlay from "../components/LevelUpOverlay";
import { Link } from "wouter";
import { ArrowRightIcon } from "@heroicons/react/outline";
import { useStore } from "../store";

function Quiz(props) {
  const { quizzes, addToUserXp } = useStore();
  const quiz = quizzes.find((quiz) => quiz.id === props.quizId);

  const [showAnswer, setShowAnswer] = useState(false);
  const [showFinalResult, setShowFinalResult] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionStatus, setSelectedOptionsStatus] = useState(false);
  const [rightAnswersCount, setRightAnswersCount] = useState(0);
  const [textRating, setTextRating] = useState("");
  const [rating, setRating] = useState(3);

  function selectOption(optionIndex) {
    if (showAnswer) return;

    if (quiz.questions[currentQuestionIndex].answerIndex === optionIndex) {
      setSelectedOptionsStatus(true);
      setRightAnswersCount(rightAnswersCount + 1);
    } else {
      setSelectedOptionsStatus(false);
    }

    setShowAnswer(true);
  }

  function nextQuestion() {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowAnswer(false);
    } else {
      setShowFinalResult(true);
      setShowAnswer(false);
      addToUserXp(quiz, rightAnswersCount, textRating);
    }
  }

  function getOptionStatus(optionIndex) {
    if (!showAnswer) return null;
    return `${optionIndex === quiz.questions[currentQuestionIndex].answerIndex}`;
  }

  function startAnotherAttempt() {
    setShowAnswer(false);
    setShowFinalResult(false);
    setCurrentQuestionIndex(0);
    setSelectedOptionsStatus(false);
    setRightAnswersCount(0);
  }

  const backgroundFeedback = useMemo(() => {
    if (!showAnswer) return "to-gray-500";
    return selectedOptionStatus ? "to-green-500" : "to-red-500";
  }, [showAnswer, selectedOptionStatus]);

  if (!quiz) {
    return (
      <div className="flex flex-col justify-center h-screen">
        <h2 className="text-lg">
          Ops! Nenhum quiz encontrado... Retorne para o{" "}
          <Link to="/home" className="underline">
            in??cio.
          </Link>
        </h2>
      </div>
    );
  }

  const onHandleChangeRating = (rating) => {
    setRating(rating);
  };

  return (
    <div
      className={`min-h-screen w-full transition-all flex flex-col items-center p-8 bg-gradient-to-b from-gray-500 ${backgroundFeedback}`}>
      <header className="flex justify-between mb-14">
        <h1 className="text-4xl font-bold">Quiz - {quiz.title}</h1>
      </header>

      <main className="flex flex-col w-full items-center">
        <LevelUpOverlay />
        {showFinalResult ? (
          <>
            <QuizResultView
              quiz={quiz}
              rightAnswers={rightAnswersCount}
              startAnotherAttempt={startAnotherAttempt}
              onChangeTextRating={(event) => setTextRating(event.target.value)}
              onChangeRating={onHandleChangeRating}
              rating={rating}
            />
          </>
        ) : (
          <>
            <h2 className="text-2xl w-full text-center mb-5 text-gray-200 font-bold">
              <span className="block mb-4 uppercase font-normal tracking-wider">
                Pergunta ({currentQuestionIndex + 1}/{quiz.questions.length})
              </span>
              {quiz.questions[currentQuestionIndex].title}
            </h2>

            <ul className="flex flex-col justify-center mb-2 w-full max-w-lg">
              {quiz.questions[currentQuestionIndex].options.map((option, i) => (
                <QuizOption
                  key={i}
                  option={option}
                  status={getOptionStatus(i)}
                  isSelecting={!showAnswer}
                  onClick={() => selectOption(i)}
                />
              ))}
            </ul>

            {showAnswer && (
              <div className="w-full max-w-lg flex flex-col text-2xl  text-center text-white ">
                <span className="rounded-lg mb-8">
                  {selectedOptionStatus ? "Resposta certa !" : " Resposta errada !"}
                </span>
                <Button width="full" color="blue" onClick={nextQuestion} className="mt-auto">
                  Pr??xima
                  <ArrowRightIcon className="w-6" />
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default Quiz;
