import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #2f2d52;
  color: white;
  border: none;
  border-radius: 1rem;
  margin: 0 0.5rem;
`;

const Button = (props) => {
  return <StyledButton onClick={props.onClick}>{props.children}</StyledButton>;
};

export default Button;
