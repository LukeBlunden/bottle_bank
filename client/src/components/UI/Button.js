import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.color};
  ${(props) => (props.width ? "width:" + props.width : null)};
  border: none;
`;

const Button = ({
  onClick,
  children,
  color = "var(--col-main-pos)",
  width,
}) => {
  return (
    <StyledButton onClick={onClick} color={color} width={width}>
      {children}
    </StyledButton>
  );
};

export default Button;
