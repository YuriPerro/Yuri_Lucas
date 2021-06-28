import React from "react";
import { useLocation } from "wouter";

import { LogoutIcon } from "@heroicons/react/outline";
import Card from "../components/Card";
import Button from "../components/Button";

function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex flex-col justify-center p-8 bg-gradient-to-b from-gray-600 to-gray-500">
      <header className="flex justify-between mb-14">
        <h1 className="text-4xl font-bold">Quizzes</h1>

        <Button color="red" onClick={() => setLocation("/login")}>
          Sair
          <LogoutIcon className="w-6" />
        </Button>
      </header>

      <main className="flex-1">
        <section className="mb-6">
          <h2 className="text-2xl font-bold mb-4">HTML5 - Linguagem de marcação</h2>
          <div className="grid grid-cols-4 gap-8">
            <Card
              title="Formulários"
              description="Conteúdo: Construção de formulários semânticos, bem estruturados e de fácil compreensão."
              footer="Criador por Prof. Igor"
            />
            <Card
              title="Inputs"
              description="Conteúdo: Os diferentes tipos de inputs, quando utilizar cada um, e suas peculiaridades."
              footer="Criador por Prof. Igor"
            />
            <Card
              title="Tabelas"
              description="Conteúdo: Construção de tabelas seguindo padrões de HTML semânticos e possibilitando a separação de dados."
              footer="Criador por Prof. Igor"
            />
            <Card
              title="Listas"
              description="Conteúdo: Os diferentes tags de listas possiveis, listas aninhadas e sub listas"
              footer="Criador por Prof. Igor"
            />
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
