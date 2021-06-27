import React from "react";

import img from "../assets/images/ilustra.png";

function Intro() {
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
            <p className="mb-4">
              Aqui você irá encontrar quizzes sobre todo conteúdo da disciplina como HTML, CSS e
              Javascipt. Entre já e comece a aprender.
            </p>
            <button
              onClick={() => setLocation("/login")}
              className="rounded p-3 w-52 bg-green-400 mt-5">
              Avançar
            </button>
          </article>

          <img src={img} className="w-auto" alt="ilustracao" />
        </aside>
      </main>
    </div>
  );
}

export default Intro;
