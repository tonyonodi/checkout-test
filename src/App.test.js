import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import App, { initialState, reducer } from "./App";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders correctly", () => {
  const tree = renderer.create(<App />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe("app reducer", () => {
  test("can update form values", () => {
    const dispatch = {
      type: "update_form_value",
      formUpdates: { name: "Alice" },
    };

    const firstUpdate = reducer(initialState, dispatch);

    expect(firstUpdate).toEqual({
      formValues: {
        name: "Alice",
        email: "",
        rating: undefined,
        comment: "",
      },
      formErrors: {},
      comments: initialState.comments,
    });
  });

  test("can add comment from correct form values", () => {
    const dispatch = { type: "add_comment", time: new Date(), id: 1 };
    const state = {
      formValues: {
        name: "Bob",
        email: "bob@gmail.com",
        rating: 3,
        comment: "Another comment.",
      },
      formErrors: {},
      comments: [],
    };

    const firstUpdate = reducer(state, dispatch);

    const firstExpected = {
      formValues: {
        name: "",
        email: "",
        rating: undefined,
        comment: "",
      },
      formErrors: {},
      comments: [
        {
          name: "Bob",
          email: "bob@gmail.com",
          rating: 3,
          comment: "Another comment.",
          timeSubmitted: dispatch.time,
          id: 1,
        },
      ],
    };

    expect(firstUpdate).toEqual(firstExpected);
  });

  test("shows errors for missing values", () => {
    const dispatch = { type: "add_comment", time: new Date(), id: 1 };
    const state = {
      formValues: {
        name: "",
        email: "",
        rating: undefined,
        comment: "",
      },
      formErrors: {},
      comments: [],
    };

    const firstUpdate = reducer(state, dispatch);

    const firstExpected = {
      formValues: {
        name: "",
        email: "",
        rating: undefined,
        comment: "",
      },
      formErrors: {
        name: "Name cannot be empty.",
        email: "Email cannot be empty.",
        rating: "Rating cannot be empty.",
      },
      comments: [],
    };

    expect(firstUpdate).toEqual(firstExpected);
  });
});
