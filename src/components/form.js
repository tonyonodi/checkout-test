import React, { useRef, useEffect } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label``;

const Input = styled.input`
  margin: 10px 0;
  padding: 5px;
  display: block;
  width: 100%;
`;

const TextArea = styled.textarea`
  margin: 10px 0;
  padding: 5px;
`;

const Error = styled.div`
  color: red;
  display: inline-block;
  margin-left: 10px;
`;

export default ({
  values: { name, email, rating, comment },
  errors,
  updateValues,
  addComment,
}) => {
  const nameInputEl = useRef(null);
  useEffect(() => {
    if (nameInputEl && nameInputEl.current) {
      nameInputEl.current.focus();
    }
  }, []);

  const handleChange = event => {
    const { name, value } = event.target;
    updateValues({ [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    addComment();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <Label>Name *</Label>
        {errors.name && <Error>{errors.name}</Error>}
        <Input
          type="text"
          ref={nameInputEl}
          name="name"
          value={name}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label>Email *</Label>
        {errors.email && <Error>{errors.email}</Error>}
        <Input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label>Rating *</Label>
        {errors.rating && <Error>{errors.rating}</Error>}
        <Input
          type="number"
          name="rating"
          value={rating}
          onChange={handleChange}
          min="0"
          max="5"
          step="1"
        />
      </div>
      <div />
      <Label>Comment</Label>
      <TextArea name="comment" value={comment} onChange={handleChange} />
      <Input type="submit" />
    </Form>
  );
};
