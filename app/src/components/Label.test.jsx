import React from "react";
import { mount } from "@cypress/react";
import Label from "./Label";
import Wrapper from "./Wrapper";
import "../styles/index.css";

it("Label should renders correctly", () => {
  mount(
    <Wrapper>
      <Label data-test="lb" className="text-black">
        Label
      </Label>
    </Wrapper>,
  );
  cy.get("[data-test='lb']").should("exist");
});

it("Label should renders children", () => {
  mount(
    <Wrapper>
      <Label data-test="lb" className="text-black">
        Label
      </Label>
    </Wrapper>,
  );

  cy.get("[data-test='lb']").contains("Label");
});
