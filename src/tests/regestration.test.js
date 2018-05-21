import Registration from "../components/registration/Registration";
import React, { Component } from "react";
import configureStore from "redux-mock-store";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import store from "../store";
import * as actions from "../store/redux/user/actions";

let component;

beforeEach(() => {
  component = shallow(
    <Provider store={store}>
      <Registration />
    </Provider>
  );
});

describe("Regestration component", () => {
  it("when form is empti - submit botton is disabled", () => {
    const submitBtn = component.find("registration__create-button");
    console.log(component.props);
    expect(submitBtn.closest("fieldset").props("disabled")).toBe(true);
  });
});
