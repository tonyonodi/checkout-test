import React from "react";
import styled from "styled-components";
import Comment from "./comment";

const NoCommentsView = styled.div``;

const ParentView = styled.div``;

export default ({ comments }) => {
  if (comments.length === 0) {
    return <NoCommentsView>There are no comments yet.</NoCommentsView>;
  }

  return (
    <ParentView>
      {comments.map(comment => (
        <Comment key={comment.id} {...comment} />
      ))}
    </ParentView>
  );
};
