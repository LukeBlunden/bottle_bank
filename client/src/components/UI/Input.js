import React from "react";
import styled, { css } from "styled-components";

const InputGroup = styled.div`
  display: flex;
  position: relative;
  /* flex-direction: column; */
  ${(props) =>
    props.flex ? "justify-content: space-between;" : "flex-direction: column;"}

  && > input {
    ${(props) => (props.innerLabel ? "padding-left: 1.4rem;" : null)}
  }

  & > .innerLabel {
    ${(props) =>
      props.innerLabel &&
      css`
        position: absolute;
        top: 2rem;
        left: 5px;
        color: var(--col-med-light-grey);
      `}
  }
`;

const Input = ({
  name,
  label,
  innerLabel,
  type,
  placeholder,
  value,
  onChange,
  autoFocus,
  flex,
}) => {
  return (
    <InputGroup flex={flex} innerLabel={innerLabel}>
      <label htmlFor={name}>{label}</label>
      {innerLabel && <label className="innerLabel">{innerLabel}</label>}
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
