import React from "react";
import { mount } from "@cypress/react";
import Card from "./Card";
import Wrapper from "./Wrapper";
import "../styles/index.css";

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

describe("Card", () => {
  it("Should renders correctly", () => {
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

  it("Should renders props texts", () => {
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

    cy.get("[data-test='card']").contains("Listas").should("exist");
    cy.get("[data-test='card']").contains(quiz.description).should("exist");
    cy.get("[data-test='card']").contains("Fácil").should("exist");
    cy.get("[data-test='card']").contains(`Criador por ${quiz.createdBy}`).should("exist");
  });

  it("Should be disabled if acomplished", () => {
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

    cy.get("[data-test='card']").contains("Listas").should("exist");
    cy.get("[data-test='card']").contains(quiz.description).should("exist");
    cy.get("[data-test='card']").contains("Fácil").should("exist");
    cy.get("[data-test='card']").contains(`Criador por ${quiz.createdBy}`).should("exist");
  });

  it("Should renders props texts", () => {
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

    cy.get("[data-test='card']").contains("Listas").should("exist");
    cy.get("[data-test='card']").contains(quiz.description).should("exist");
    cy.get("[data-test='card']").contains("Fácil").should("exist");
    cy.get("[data-test='card']").contains(`Criador por ${quiz.createdBy}`).should("exist");
  });
});
