import React from "react";
import { mount } from "@cypress/react";
import Button from "./Button";
import Wrapper from "./Wrapper";
import "../styles/index.css";

describe("Button", () => {
  it("Should renders children", () => {
    mount(
      <Wrapper>
        <Button data-test="btn">Botão</Button>
      </Wrapper>,
    );
    cy.get("[data-test='btn']").should("exist");
  });

  it("Should renders children", () => {
    mount(
      <Wrapper>
        <Button data-test="btn-blue" color="blue">
          Botão
        </Button>
      </Wrapper>,
    );

    cy.get("[data-test='btn-blue']").contains("Botão").should("exist");
  });

  it("Should change color based on props", () => {
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
    cy.get("[data-test='btn-blue']").should("exist");
    cy.get("[data-test='btn-blue']").click();

    cy.get("[data-test='btn-red']").should("exist");
    cy.get("[data-test='btn-red']").click();

    cy.get("[data-test='btn-green']").should("exist");
    cy.get("[data-test='btn-green']").click();

    cy.get("[data-test='btn-gray']").should("exist");
    cy.get("[data-test='btn-gray']").click();

    cy.get("[data-test='btn-purple']").should("exist");
    cy.get("[data-test='btn-purple']").click();

    cy.get("[data-test='btn-yellow']").should("exist");
    cy.get("[data-test='btn-yellow']").click();
  });
});
