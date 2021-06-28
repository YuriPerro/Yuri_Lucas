import React from "react";
import { useLocation } from "wouter";

import { LoginIcon } from "@heroicons/react/outline";
import Card from "../components/Card";
import Button from "../components/Button";
import { quizzes } from "../api/quizzes";

function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col justify-center 
    p-8 bg-gradient-to-b from-purple-600 to-purple-400">
      <header className="flex justify-between mb-14">
        <h1 className="text-4xl font-bold">Quizzer</h1>

        <Button color="red" onClick={() => setLocation("/login")}>
          <LoginIcon className="w-6" />
          Sair
        </Button>
      </header>

      <main className="flex-1">
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-4">HTML5 - Linguagem de marcação</h2>
          <div className="grid grid-cols-4 gap-8">
            {quizzes.map((quiz, i) => (
              <Card
                key={i}
                onClick={() => setLocation(`/quiz/${i}`)}
                title={quiz.title}
                description={quiz.description}
                footer={`Criador por ${quiz.createdBy}`}
              />
            ))}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-4">CSS - Estilização</h2>
          <div className="grid grid-cols-4 gap-8">
            <Card
              title="Display"
              description="Conteúdo: Uso da propriedade display e suas aplicações na estilização de containers."
              footer="Criador por Prof. Igor"
            />
            <Card
              title="Position"
              description="Conteúdo: Propriedade position para posicionamento, alinhamento de elementos e destacamento de contexto."
              footer="Criador por Prof. Igor"
            />
            <Card
              title="Tipografia"
              description="Conteúdo: Estilização de textos e fontes, indo alem de apenas cores."
              footer="Criador por Prof. Igor"
            />
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Javascript - Linguagem de programação</h2>
          <div className="grid grid-cols-4 gap-8">
            <Card
              title="Variáveis"
              description="Conteúdo: Diferentes tipos de declaração de variáveis, suas formas de declaração e escopos."
              footer="Criador por Prof. Igor"
            />
            <Card
              title="Lanços de repetição"
              description="Conteúdo: Sintaxe dos laço de repetição e o uso de forma eficiente."
              footer="Criador por Prof. Igor"
            />
            <Card
              title="Funções"
              description="Conteúdo: Teste seu conhecimento a respeito dos formulários no HTML5. Utilizando conceito de HTML semântico e novas tags do HTML5."
              footer="Criador por Prof. Igor"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;