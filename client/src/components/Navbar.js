import React from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";

const NavContainer = styled.div`
  display: flex;
  align-items: center;
`;

const NavLogo = styled.img`
  height: 30px;
  width: 30px;
`;

const Navbar = (props) => {
  return (
    <NavContainer>
      <NavLogo src={Logo} />
      <h3>Bottle Bank</h3>
    </NavContainer>
  );
};

export default Navbar;
