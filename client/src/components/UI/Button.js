import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.color};
  /* color: white; */
  width: ${(props) => props.width};
  border: none;
  /* border-radius: 1rem; */
  /* margin: 0 0.5rem; */
`;

const Button = ({
  onClick,
  children,
  color = "var(--col-main-pos)",
  width = "100%",
}) => {
  return (
    <StyledButton onClick={onClick} color={color} width={width}>
      {children}
    </StyledButton>
  );
};

export default Button;
