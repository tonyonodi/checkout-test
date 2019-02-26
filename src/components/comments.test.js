import React from "react";
import renderer from "react-test-renderer";
import Comments from "./Comments";

it("renders comment correctly", () => {
  const tree = renderer
    .create(
      <Comments
        comments={[
          {
            name: "Alice",
            email: "alice@gmail.com",
            rating: 4,
            comment: "Some comment.",
            timeSubmitted: new Date("2019-02-26T11:39:26.259Z"),
            id: 1,
          },
          {
            name: "Bob",
            email: "bob@gmail.com",
            rating: 2,
            comment: "Another comment.",
            timeSubmitted: new Date("2019-02-26T11:39:35.916Z"),
            id: 2,
          },
        ]}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders empty comments correctly", () => {
  const tree = renderer.create(<Comments comments={[]} />).toJSON();
  expect(tree).toMatchSnapshot();
});
