import React from "react";
import styled from "styled-components";

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Select = ({ name, label, value, onChange, children }) => {
  return (
    <InputGroup>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      >
        {children}
      </select>
    </InputGroup>
  );
};

export default Select;
