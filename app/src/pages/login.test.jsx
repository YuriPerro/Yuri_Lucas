import React from "react";
import { mount } from "@cypress/react";
import App from "../App";
import { StoreProvider } from "../store";

import "../styles/index.css";

describe("Login teatcher", () => {
  beforeEach(() => {
    mount(
      <StoreProvider>
        <App />
      </StoreProvider>,
    );
  });

  it("Component should renders correctly", () => {
    cy.get("[data-test='btn']").should("exist");
  });

  it("Component should renders and login teacher", () => {
    const email = "professor@teste.com";
    const password = "123456";
    const title = "Entre no Quizzer";

    mount(
      <StoreProvider>
        <App />
      </StoreProvider>,
    );

    cy.get("[data-test='btn']").click();
    cy.get("h1").contains(title);
    cy.get("[data-test='input-email']").click().type(email);
    cy.get("[data-test='input-password']").click().type(password);
    cy.get("[data-test='select-usertype']").select("prof");
    cy.get("[data-test='btn-enter']").click();
  });
});
