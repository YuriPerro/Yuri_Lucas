import React from "react";
import { mount } from "@cypress/react";
import Input from "./Input";
import Wrapper from "./Wrapper";
import "../styles/index.css";

it("Button should renders children", () => {
  const inputText = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi commodi aliquid perferendis impedit `;

  mount(
    <Wrapper>
      <Input data-test="input-text" />
    </Wrapper>,
  );

  cy.get("[data-test='input-text']").click().type(inputText).should("have.value", inputText);
});
