import React from "react";
import { useLocation } from "wouter";

import { ArrowRightIcon } from "@heroicons/react/outline";
import Button from "../components/Button";
import img from "../assets/images/ilustra.png";

function Intro() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex flex-col w-full min-h-screen p-8 bg-purple-500">
      <main className="">
        <aside className="flex-1 w-full grid grid-cols-2">
          <article className="text-xl mb-16">
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

          <img src={img} className="w-auto" alt="ilustracao" />
        </aside>
      </main>
    </div>
  );
}

export default Intro;
