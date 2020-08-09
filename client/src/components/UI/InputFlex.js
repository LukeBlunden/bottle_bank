import React from "react";
import styled from "styled-components";

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InputFlex = ({
  name,
  label,
  type,
  placeholder,
  value,
  onChange,
  autoFocus,
}) => {
  return (
    <InputGroup>
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

export default InputFlex;
