import React from "react";
import { mount } from "@cypress/react";
import LoadingView from "./LoadingView";
import Wrapper from "./Wrapper";
import "../styles/index.css";

describe("LoadingView", () => {
  it(" should renders correctly", () => {
    mount(
      <Wrapper>
        <LoadingView isLoading={true} className="text-black">
          LoadingView
        </LoadingView>
      </Wrapper>,
    );
    cy.get("[data-test='loading']");
  });

  it(" should not renders is loading is false", () => {
    mount(
      <Wrapper>
        <LoadingView isLoading={false} className="text-black">
          LoadingView
        </LoadingView>
      </Wrapper>,
    );
    cy.get("[data-test='loading']").should("not.exist");
  });
});
