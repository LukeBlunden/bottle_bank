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

const Select = ({ name, label, value, onChange, options }) => {
  return (
    <InputGroup>
      <label htmlFor={name}>{label}</label>
      {/* <select
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus={autoFocus}
        autoComplete="on"
        required
      /> */}
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </InputGroup>
  );
};

export default Select;
