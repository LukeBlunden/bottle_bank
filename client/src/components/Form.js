import React from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  text-align: left;

  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const Form = ({ onSubmit, children }) => {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
};

export default Form;
