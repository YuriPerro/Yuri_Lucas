import React, { useMemo } from "react";
import { useLocation } from "wouter";

import { LoginIcon, ClipboardListIcon, XCircleIcon } from "@heroicons/react/outline";
import Card from "../components/Card";
import Button from "../components/Button";
import logo from "../assets/images/logo-quizzer.png";
import { useStore } from "../store";

const Dashboard = () => {
  const [, setLocation] = useLocation();
  const { quizzes, user } = useStore();

  function handleDeleteQuiz(quizId) {
    console.log(quizId);
    //firebase
  }

  const quizzesFiltered = useMemo(() => {
    return quizzes.filter((quiz) => {
      if (!user) return true;
      return quiz.ownerUID === user.uid;
    });
  }, [quizzes]);

  return (
    <div className="flex flex-col w-full min-h-screen p-8 bg-gradient-to-b from-gray-400 to-gray-400">
      <header className="flex flex-col gap-2 sm:flex-row justify-center sm:justify-between items-center mb-14">
        <h1 className="text-4xl font-bold flex items-center gap-4 sm:mb-0">
          <img src={logo} alt="logo" className="w-16" /> Gerenciar
        </h1>

        <div className="flex gap-4 items-center">
          <span>
            Bem vindo
            <span className="font-semibold"> {user?.name}!</span>
          </span>
          <Button color="green" onClick={() => setLocation("/create-quiz")}>
            <ClipboardListIcon className="w-6" />
            Criar Quiz
          </Button>
          <Button color="red" onClick={() => setLocation("/login")}>
            <LoginIcon className="w-6" />
            Sair
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Seus quizzes</h2>
          <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
            {quizzesFiltered.map((quiz) => (
              <div key={quiz.id} className="relative flex w-full h-full">
                <button
                  type="button"
                  tabIndex="-1"
                  className="absolute transition-all -top-4 z-50 -right-1 text-gray-500 bg-gray-100 rounded-full transform translate-x-2 focus:outline-none hover:text-red-400"
                  title="Excluir pergunta"
                  onClick={() => handleDeleteQuiz(quiz.id)}>
                  <XCircleIcon className="w-9" />
                </button>

                <Card
                  title={quiz.title}
                  difficulty={quiz.difficulty}
                  description={quiz.description}
                  hoverEffect={false}
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
