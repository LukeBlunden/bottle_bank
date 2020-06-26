import React, { useState } from "react";
import styled from "styled-components";

const DropdownContainer = styled.div`
  margin-bottom: 1em;
  margin-right: 1em;
`;

const Title = styled.div`
  margin: 0.3em;
  width: 100%;
  cursor: pointer;
  transform: rotate(180deg);
`;

const Menu = styled.div`
  transition: max-height 0.3s ease-out;
  max-height: ${(props) => (props.open ? "5em" : "0")};
  overflow: hidden;
`;

const Option = styled.div`
  margin: 0.3em;
  cursor: pointer;
  width: 100%;
  background-color: darkorange;
`;

const Dropdown = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownContainer>
      <Title onClick={() => setOpen(!open)}>^</Title>
      <Menu open={open}>
        {props.children.map((link) => (
          <Option onClick={() => setOpen(false)}>{link}</Option>
        ))}
      </Menu>
    </DropdownContainer>
  );
};

export default Dropdown;
