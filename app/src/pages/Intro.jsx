import React from "react";
import { useLocation } from "wouter";

import { ArrowRightIcon } from "@heroicons/react/outline";
import Button from "../components/Button";
import img from "../assets/images/ilustra.png";
import logo from "../assets/images/logo-quizzer.png";

function Intro() {
  const [, setLocation] = useLocation();

  return (
    <div
      data-test="intro"
      className="flex justify-center w-full min-h-screen p-8 bg-gradient-to-bl from-purple-600 to-purple-500">
      <main className="flex flex-row  flex-wrap items-center justify-around w-full">
        <article className="text-xl mb-16 w-full max-w-2xl">
          <div className="w-16 mb-4">
            <img src={logo} alt="logo" />
          </div>
          <p className="mb-8 text-4xl font-semibold">Bem vindo ao Quizzer!</p>
          <p className="mb-4">
            O Quizzer é um sistema gamificado para auxiliar no ensino e aprendizado da disciplina
            laboratório de programação web (DCC121) da UFJF.
          </p>
          <p className="mb-4">
            Aqui você irá encontrar quizzes de vários níveis sobre todo conteúdo da disciplina como
            HTML, CSS e Javascript. E também poderá acumular pontos, subir de nível, adquirir badges
            e muito mais.
          </p>
          <p className="mb-8"> Entre já e comece a aprender.</p>
          <Button data-test="btn-forward" color="green" onClick={() => setLocation("/login")}>
            Avançar
            <ArrowRightIcon className="w-6" />
          </Button>
        </article>

        <div className="mt-16 flex-1">
          <img
            src={img}
            className="w-full max-w-3xl mx-auto"
            style={{ minWidth: "450px" }}
            alt="ilustracao"
          />
        </div>
      </main>
    </div>
  );
}

export default Intro;
