import React from "react";
import { useLocation } from "wouter";

import { ArrowRightIcon } from "@heroicons/react/outline";
import Button from "../components/Button";
import img from "../assets/images/ilustra.png";
import logo from "../assets/images/logo-quizzer.png";

function Intro() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex justify-center w-full min-h-screen p-8 bg-gradient-to-bl from-purple-600 to-purple-500">
      <main className="flex flex-row items-center">
        <div className="flex flex-row">
          <article className="text-xl mb-16">
            <div className="w-16 mb-4">
              <img src={logo} alt="logo" />
            </div>
            <p className="mb-4">Bem vindo ao Quizzer.</p>
            <p className="mb-4">
              Sistema gamificado para auxiliar no ensino e aprendizado da disciplina Laboratorio de
              programação Web (DCC121).
            </p>
            <p className="mb-8">
              Aqui você irá encontrar quizzes sobre todo conteúdo da disciplina como HTML, CSS e
              Javascipt. Entre já e comece a aprender.
            </p>
            <Button color="green" onClick={() => setLocation("/login")}>
              Avançar
              <ArrowRightIcon className="w-6" />
            </Button>
          </article>

          <div className="mt-16">
            <img src={img} className="" alt="ilustracao" />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Intro;
