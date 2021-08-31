import React from "react";
import { mount } from "@cypress/react";
import Button from "./Button";
import Wrapper from "./Wrapper";
import "../styles/index.css";

it("Button should renders children", () => {
  mount(
    <Wrapper>
      <Button data-test="btn-blue" color="blue">
        Botão
      </Button>
      <Button data-test="btn-red" color="red">
        Botão
      </Button>
      <Button data-test="btn-green" color="green">
        Botão
      </Button>
    </Wrapper>,
  );

  cy.get("[data-test='btn-blue']").contains("Botão");
  cy.get("[data-test='btn-red']").contains("Botão");
  cy.get("[data-test='btn-green']").contains("Botão");
});
