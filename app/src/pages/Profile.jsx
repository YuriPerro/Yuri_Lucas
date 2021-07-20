import React from "react";
import Button from "../components/Button";
import { LoginIcon, UserIcon, ArrowLeftIcon } from "@heroicons/react/outline";
import { useLocation } from "wouter";
import { useStore } from "../store";

import ProgressBar from "../components/ProgressBar";

import medal_one from "../assets/images/medal-first.png";
import medal_second from "../assets/images/medal-second.png";
import medal_star from "../assets/images/medal-star.png";

const Profile = () => {
  const [, setLocation] = useLocation();

  return (
    <div className="flex flex-col min-h-screen w-full p-8 bg-gradient-to-b from-purple-600 to-purple-800">
      <header className="flex flex-col gap-2 sm:flex-row justify-center sm:justify-between items-center mb-14">
        <div className="flex items-center">
          <button onClick={() => setLocation("/home")}>
            <ArrowLeftIcon className="w-8 mr-4" />
          </button>
          <h1 className="text-4xl font-bold flex items-center gap-4 mb-1">Perfil</h1>
        </div>

        <div className="flex gap-4">
          <Button color="red" onClick={() => setLocation("/login")}>
            <LoginIcon className="w-6" />
            Sair
          </Button>
        </div>
      </header>

      <main className="flex flex-col grid-cols-1 items-center">
        <div className="flex flex-col items-center">
          <div className="bg-yellow-500 w-32 h-32 rounded-full items-center flex justify-center shadow-xl">
            <img src={"https://github.com/YuriPerro.png"} className="w-28 rounded-full" />
          </div>
          <h1 className="text-2xl font-semibold mt-2"></h1>
        </div>

        <div className="flex flex-row items-center mt-10 w-100 justify-around">
          <div className="flex flex-col items-center">
            <img src={medal_one} className="w-20 rounded-lg" alt="Medalha" />
            <span className="font-normal">Primeiro Lugar</span>
          </div>
          <div className="flex flex-col items-center">
            <img src={medal_second} className="w-20 rounded-lg" alt="Medalha" />
            <span className="font-normal">Segundo Lugar</span>
          </div>
          <div className="flex flex-col items-center">
            <img src={medal_star} className="w-20 rounded-lg" alt="Medalha" />
            <span className="font-normal">Campeão</span>
          </div>
        </div>

        <ProgressBar />

        <div className="flex flex-col items-center mt-5 w-72">
          <h1 className="text-2xl mt-2">Quizes realizados: 5</h1>
        </div>
      </main>
    </div>
  );
};

export default Profile;
