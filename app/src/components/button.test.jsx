import React from "react";
import { mount } from "@cypress/react";
import Button from "./Button";
import Wrapper from "./Wrapper";
import "../styles/index.css";

it("Button should renders children", () => {
  mount(
    <Wrapper>
      <Button data-test="btn">Botão</Button>
    </Wrapper>,
  );
  cy.get("[data-test='btn']").should("exist");
});

it("Button should renders children", () => {
  mount(
    <Wrapper>
      <Button data-test="btn-blue" color="blue">
        Botão
      </Button>
    </Wrapper>,
  );

  cy.get("[data-test='btn-blue']").contains("Botão");
});

it("Button should change color based on props", () => {
  mount(
    <Wrapper>
      <Button data-test="btn-blue" color="blue">
        color blue
      </Button>
      <Button data-test="btn-red" color="red">
        color red
      </Button>
      <Button data-test="btn-green" color="green">
        color green
      </Button>
      <Button data-test="btn-gray" color="gray">
        color gray
      </Button>
      <Button data-test="btn-purple" color="purple">
        color purple
      </Button>
      <Button data-test="btn-yellow" color="yellow">
        color yellow
      </Button>
    </Wrapper>,
  );

  cy.get("[data-test='btn-blue']").contains("color blue");
  cy.get("[data-test='btn-red']").contains("color red");
  cy.get("[data-test='btn-green']").contains("color green");
  cy.get("[data-test='btn-gray']").contains("color gray");
  cy.get("[data-test='btn-purple']").contains("color purple");
  cy.get("[data-test='btn-yellow']").contains("color yellow");
});
