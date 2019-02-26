import React from "react";
import renderer from "react-test-renderer";
import Comment from "./Comment";

it("renders comment correctly", () => {
  const tree = renderer
    .create(<Comment name="Bob" rating={2} comment="Not a huge fan" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders 0 star comment correctly", () => {
  const tree = renderer
    .create(<Comment name="Bob" rating={0} comment="Not a huge fan" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
