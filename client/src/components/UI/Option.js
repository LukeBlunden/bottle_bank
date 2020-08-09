import React from "react";
import styled from "styled-components";

const Option = ({ value, children }) => {
  return (
    <option key={value} value={value}>
      {children}
    </option>
  );
};

export default Option;
