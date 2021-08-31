import React from "react";
import { mount } from "@cypress/react";
import Select from "./Select";
import Wrapper from "./Wrapper";
import "../styles/index.css";

describe("Select", () => {
  it("Select should renders correctly", () => {
    mount(
      <Wrapper>
        <Select
          data-test="select"
          options={[
            { text: "Opção 1", value: "Opção 1" },
            { text: "Opção 2", value: "Opção 2" },
            { text: "Opção 3", value: "Opção 3" },
          ]}
          className="text-black">
          Select
        </Select>
      </Wrapper>,
    );

    cy.get("[data-test='select']").should("exist");
  });

  it("Select should not renders is loading is false", () => {
    mount(
      <Wrapper>
        <Select
          data-test="select"
          options={[
            { text: "Opção 1", value: "Opção 1" },
            { text: "Opção 2", value: "Opção 2" },
            { text: "Opção 3", value: "Opção 3" },
            { text: "Opção 4", value: "Opção 4" },
            { text: "Opção 5", value: "Opção 5" },
          ]}
          className="text-black">
          Select
        </Select>
      </Wrapper>,
    );

    cy.get("[data-test='select']").select("Opção 1").should("have.value", "Opção 1");
    cy.get("[data-test='select']").select("Opção 2").should("have.value", "Opção 2");
    cy.get("[data-test='select']").select("Opção 3").should("have.value", "Opção 3");
    cy.get("[data-test='select']").select("Opção 4").should("have.value", "Opção 4");
    cy.get("[data-test='select']").select("Opção 5").should("have.value", "Opção 5");
  });
});
