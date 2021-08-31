import React from "react";
import { mount } from "@cypress/react";
import App from "../App";
import { StoreProvider } from "../store";

import "../styles/index.css";

describe("Login student and click in the quizz", () => {
  it("Component should renders and login student", () => {
    const email = "aluno@teste.com";
    const password = "123456";
    const title = "Entre no Quizzer";

    mount(
      <StoreProvider>
        <App />
      </StoreProvider>,
    );

    cy.wait(2000);
    cy.get("[data-test='btn']").click();
    cy.get("h1").contains(title);
    cy.get("[data-test='input-email']").click().type(email);
    cy.get("[data-test='input-password']").click().type(password);
    cy.get("[data-test='btn-enter']").click();

    cy.wait(2000);
    cy.get("[data-test='btn-ranking']").click();
    cy.wait(2000);
    cy.go("back");

    cy.get("[data-test='-MetWdPpFtRVAVa_wque']").click();
  });
});
