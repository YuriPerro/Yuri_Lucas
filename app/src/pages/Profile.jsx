import React from "react";
import Button from "../components/Button";
import { LoginIcon, UserIcon, ArrowLeftIcon } from "@heroicons/react/outline";
import { useLocation } from "wouter";
import Input from "../components/Input";
import { useStore } from "../store";

import medal_one from "../assets/images/medal-first.png";

const Profile = () => {
  const [, setLocation] = useLocation();

  const { user } = useStore();

  console.log(user);

  return (
    <div className="flex flex-col min-h-screen w-full p-8 bg-gradient-to-b from-purple-600 to-purple-500">
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
        <div className="bg-yellow-500 w-32 h-32 rounded-full items-center flex justify-center shadow-xl">
          <img src={"https://github.com/YuriPerro.png"} className="w-28 rounded-full" />
        </div>

        <div className="relative pt-1 w-96 mt-5">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-emerald-600 bg-green-200">
                Nível atual
              </span>
            </div>
            <div className="text-right">
              <span className="text-sm font-body inline-block text-white-600">30%</span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
            <div
              style={{ width: "30%" }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-5 w-72">
          <h1 className="text-2xl ">Yuri Perro</h1>
          <h1 className="text-2xl mt-2">Quizes realizados: 5</h1>
        </div>
      </main>
    </div>
  );
};

export default Profile;
