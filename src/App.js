import React, { useReducer } from "react";
import styled from "styled-components";
import Form from "./components/form";
import Comments from "./components/comments";
import "./App.css";
import isWhitespace from "./lib/isWhitespace";

const AppView = styled.div`
  width: 960px;
  max-width: 90%;
  margin: 0 auto;
`;

export const initialState = {
  formValues: {
    name: "",
    email: "",
    rating: undefined,
    comment: "",
  },
  formErrors: {},
  comments: [
    {
      name: "Alice",
      email: "alice@gmail.com",
      rating: 4,
      comment: "Some comment.",
      timeSubmitted: new Date(),
      id: 1,
    },
  ],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "update_form_value":
      return {
        ...state,
        formValues: {
          ...state.formValues,
          ...action.formUpdates,
        },
      };

    case "add_comment":
      let formErrors = {};
      if (isWhitespace(state.formValues.name)) {
        formErrors.name = "Name cannot be empty.";
      }
      if (isWhitespace(state.formValues.email)) {
        formErrors.email = "Email cannot be empty.";
      }
      if (!state.formValues.rating) {
        formErrors.rating = "Rating cannot be empty.";
      }
      if (Object.keys(formErrors).length > 0) {
        return {
          ...state,
          formErrors,
        };
      }

      return {
        ...state,
        formValues: initialState.formValues,
        formErrors: {},
        comments: [
          ...state.comments,
          { ...state.formValues, timeSubmitted: action.time, id: action.id },
        ],
      };

    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const updateFormValues = formUpdates =>
    dispatch({
      type: "update_form_value",
      formUpdates,
    });

  const addComment = () => {
    dispatch({ type: "add_comment", time: new Date(), id: Math.random() });
  };

  return (
    <AppView className="App">
      <Form
        values={state.formValues}
        errors={state.formErrors}
        updateValues={updateFormValues}
        addComment={addComment}
      />
      <Comments comments={state.comments} />
    </AppView>
  );
};

export default App;
