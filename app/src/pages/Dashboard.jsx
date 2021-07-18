import React from "react";
import { useLocation } from "wouter";
import { quizzes } from "../api/quizzes";

import { LoginIcon, ClipboardListIcon } from "@heroicons/react/outline";
import Card from "../components/Card";
import Button from "../components/Button";
import logo from "../assets/images/logo-quizzer.png";

const Dashboard = () => {
  const [, setLocation] = useLocation();

  return (
    <div className="flex flex-col w-full min-h-screen p-8 bg-gradient-to-b from-purple-600 to-purple-500">
      <header className="flex flex-col gap-2 sm:flex-row justify-center sm:justify-between items-center mb-14">
        <h1 className="text-4xl font-bold flex items-center gap-4 sm:mb-0">
          <img src={logo} alt="logo" className="w-16" /> Gerenciar
        </h1>

        <div className="flex gap-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 ">
            {quizzes.map((quiz, i) => (
              <Card
                key={i}
                onClick={() => setLocation(`/quiz/${i}`)}
                title={quiz.title}
                description={quiz.description}
              />
            ))}
            {quizzes.map((quiz, i) => (
              <Card
                key={i}
                onClick={() => setLocation(`/quiz/${i}`)}
                title={quiz.title}
                description={quiz.description}
              />
            ))}
            {quizzes.map((quiz, i) => (
              <Card
                key={i}
                onClick={() => setLocation(`/quiz/${i}`)}
                title={quiz.title}
                description={quiz.description}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
