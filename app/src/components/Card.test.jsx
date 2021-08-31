import React from "react";
import { mount } from "@cypress/react";
import Card from "./Card";
import Wrapper from "./Wrapper";
import "../styles/index.css";

const hasClasses = (classes) => {
  return;
};

const quiz = {
  title: "Listas",
  description:
    "Conteúdo: As diferentes tags relacionadas a listas no HTML, listas ordenadas, descritivas, sub-listas entre outras.",
  createdBy: "Prof. Igor",
  createdAt: "27/06/2021",
  difficulty: 1,
  questions: [
    {
      title: "Quantas tags relacionadas diretamente a listas existe no HTML5 ?",
      options: ["4", "3", "6", "2"],
      answerIndex: 2,
    },
  ],
};

it("Card should renders correctly", () => {
  mount(
    <Wrapper>
      <Card
        data-test="card"
        quiz={quiz}
        hoverEffect={true}
        footer={`Criador por ${quiz.createdBy}`}
        isAcomplished={false}
        detailsAcomplished={2}
      />
    </Wrapper>,
  );

  cy.get("[data-test='card']").should("exist");
});

it("Card should renders props texts", () => {
  mount(
    <Wrapper>
      <Card
        data-test="card"
        quiz={quiz}
        hoverEffect={true}
        footer={`Criador por ${quiz.createdBy}`}
        isAcomplished={false}
        detailsAcomplished={2}
      />
    </Wrapper>,
  );

  cy.get("[data-test='card']").contains("Listas");
  cy.get("[data-test='card']").contains(quiz.description);
  cy.get("[data-test='card']").contains("Fácil");
  cy.get("[data-test='card']").contains(`Criador por ${quiz.createdBy}`);
});

it("Card should be disabled if acomplished", () => {
  mount(
    <Wrapper>
      <Card
        data-test="card"
        quiz={quiz}
        hoverEffect={true}
        footer={`Criador por ${quiz.createdBy}`}
        isAcomplished={true}
        detailsAcomplished={2}
      />
    </Wrapper>,
  );

  cy.get("[data-test='card']").contains("Listas");
  cy.get("[data-test='card']").contains(quiz.description);
  cy.get("[data-test='card']").contains("Fácil");
  cy.get("[data-test='card']").contains(`Criador por ${quiz.createdBy}`);
});
it("Card should renders props texts", () => {
  mount(
    <Wrapper>
      <Card
        data-test="card"
        quiz={quiz}
        hoverEffect={true}
        footer={`Criador por ${quiz.createdBy}`}
        isAcomplished={false}
        detailsAcomplished={2}
      />
    </Wrapper>,
  );

  cy.get("[data-test='card']").contains("Listas");
  cy.get("[data-test='card']").contains(quiz.description);
  cy.get("[data-test='card']").contains("Fácil");
  cy.get("[data-test='card']").contains(`Criador por ${quiz.createdBy}`);
});
