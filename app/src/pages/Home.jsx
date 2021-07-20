import React from "react";
import { useLocation } from "wouter";

import { LoginIcon, UserIcon } from "@heroicons/react/outline";
import Button from "../components/Button";
import logo from "../assets/images/logo-quizzer.png";
import { ListQuizzes } from "../components/ListQuizzes";
import { useStore } from "../store";

function Home() {
  const [, setLocation] = useLocation();
  const { categories } = useStore();

  return (
    <div className="flex flex-col min-h-screen w-full p-8 bg-gradient-to-b from-purple-600 to-purple-500">
      <header className="flex flex-col gap-2 sm:flex-row justify-center sm:justify-between items-center mb-14">
        <h1 className="text-4xl font-bold flex items-center gap-4">
          <img src={logo} alt="logo" className="w-16" /> Início
        </h1>

        <div className="flex gap-4">
          <Button color="green" onClick={() => setLocation("/profile")}>
            <UserIcon className="w-6" />
            Perfil
          </Button>
          <Button color="red" onClick={() => setLocation("/login")}>
            <LoginIcon className="w-6" />
            Sair
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {categories.map((categorie, i) => (
          <div key={categorie.name + i}>
            <h2 className="text-2xl font-bold mb-4">{categorie.name}</h2>
            <ListQuizzes categorie={categorie.value} />
          </div>
        ))}
      </main>
    </div>
  );
}

export default Home;
