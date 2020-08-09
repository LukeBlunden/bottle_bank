import React from "react";
import styled from "styled-components";

const InputGroup = styled.div`
  display: flex;
  /* flex-direction: column; */
  ${(props) =>
    props.flex ? "justify-content: space-between;" : "flex-direction: column;"}
`;

const Input = ({
  name,
  label,
  type,
  placeholder,
  value,
  onChange,
  autoFocus,
  flex,
}) => {
  return (
    <InputGroup flex={flex}>
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={autoFocus}
        autoComplete="on"
      />
    </InputGroup>
  );
};

export default Input;
