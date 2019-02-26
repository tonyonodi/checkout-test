import React from "react";
import renderer from "react-test-renderer";
import Form from "./form";

it("renders inputs correctly", () => {
  const tree = renderer
    .create(
      <Form
        values={{
          name: "Alice",
          email: "alice@gmail.com",
          rating: 3,
          comment: "Quick comment",
        }}
        errors={{}}
        updateValues={() => {}}
        addComment={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders errors correctly", () => {
  const tree = renderer
    .create(
      <Form
        values={{
          name: "Alice",
          email: "alice@gmail.com",
          rating: 3,
          comment: "Quick comment",
        }}
        errors={{
          name: "Name cannot be empty.",
          email: "Email cannot be empty.",
          rating: "Name cannot be empty.",
        }}
        updateValues={() => {}}
        addComment={() => {}}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
