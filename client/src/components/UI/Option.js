import React from "react";
import styled from "styled-components";

const Option = ({ key, value, children }) => {
  return (
    <option key={key} value={value}>
      {children}
    </option>
  );
};

export default Option;
