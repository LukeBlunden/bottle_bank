import React from "react";
import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  text-align: left;

  & label {
    margin-bottom: 0.3rem;
    font-size: 0.8rem;
    /* margin-left: 0.5rem; */
  }

  & input,
  & select {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: var(--border-primary) solid var(--col-dark-grey);
    outline: none;
    background-color: var(--col-main-bg);
    margin: 0 -0.5rem;
  }

  & input[type="checkbox"] {
    appearance: none;
    margin-right: 0rem;

    &:checked {
      background-color: var(--col-main-pos);
    }
  }

  & > button {
    border-radius: 0.5rem;
    border: var(--border-primary) solid var(--col-dark-grey);
    padding: 0.5rem;
    margin: 0 -0.5rem;
  }

  & > *:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const Form = ({ onSubmit, children }) => {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>;
};

export default Form;
