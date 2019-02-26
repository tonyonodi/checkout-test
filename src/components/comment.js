import React from "react";
import styled from "styled-components";
import isWhitespace from "../lib/isWhitespace";

const STAR_CHAR = "⭐";

const CommentView = styled.div``;

const Name = styled.h3`
  display: inline-block;
`;

const Rating = styled.div`
  display: inline-block;
  margin-left: 10px;
`;

const CommentText = styled.div``;

const Star = () => <span>{STAR_CHAR}</span>;

export default ({ name, rating, comment }) => {
  const commentParagraphs = comment.split(`\n`).filter(s => !isWhitespace(s));

  return (
    <CommentView>
      <Name>{name}</Name>
      <Rating>
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} />
        ))}
      </Rating>
      <CommentText>
        {commentParagraphs.map((par, i) => (
          <p key={i}>{par}</p>
        ))}
      </CommentText>
    </CommentView>
  );
};
