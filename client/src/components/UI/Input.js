import React from "react";
import styled from "styled-components";

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;

  & label {
    margin-bottom: 0.3rem;
    font-size: 0.8rem;
    margin-left: 0.5rem;
  }

  & input {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: none;
    outline: none;
  }
`;

const Input = ({
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
      <label htmlFor={name}>
        {label}
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus={autoFocus}
          autoComplete="on"
        />
      </label>
    </InputGroup>
  );
};

export default Input;
