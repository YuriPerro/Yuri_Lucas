import React from "react";
import { mount, unmount } from "@cypress/react";
import App from "../App";
import "../styles/index.css";

describe("Login", () => {
  beforeEach(() => {
    mount(<App />);
  });

  it("Intro should renders correctly", () => {
    cy.get("[data-test='intro']").should("exist");
  });

  it("Intro should renders texts correctly", () => {
    cy.get("[data-test='intro']").contains("Bem vindo ao Quizzer!");
    cy.get("[data-test='btn']").should("exist");
  });

  it("Intro should go to login if click button", () => {
    cy.get("[data-test='btn']").click();
    cy.url().should("include", "/login");
  });
});
