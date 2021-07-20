import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";

import { LoginIcon, UserIcon } from "@heroicons/react/outline";
import Button from "../components/Button";
import logo from "../assets/images/logo-quizzer.png";
import { ListQuizzes } from "../components/ListQuizzes";
import { API } from "../api/services";

function Home() {
  const [, setLocation] = useLocation();

  const [categories, setCategories] = useState({});

  useEffect(() => {
    async function getCategories() {
      const resp = await API.getAllCategories();
      if (resp) setCategories(resp);
    }

    getCategories();
  }, []);

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
        {Object.keys(categories).map((id, index) => (
          <div key={id}>
            <h2 className="text-2xl font-bold mb-4">{categories[id].name}</h2>
            <ListQuizzes categorie={categories[id].value} />
          </div>
        ))}
      </main>
    </div>
  );
}

export default Home;
