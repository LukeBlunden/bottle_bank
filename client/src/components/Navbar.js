import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";

const NavContainer = styled.nav`
  display: grid;
  grid-template-columns: 3rem auto 2rem;
  color: white;
  padding: 0.5rem;
  background-color: #2f2d52;
  margin-bottom: 1rem;
  align-items: center;
`;

const NavLogo = styled.img`
  height: 30px;
  width: 30px;
`;

const NavTitle = styled.h2`
  margin-right: auto;
`;

const LinksContainer = styled.div`
  grid-column: 1 / span 3;
  transition: max-height 0.3s ease-out;
  max-height: ${(props) => (props.open ? "6em" : "0")};
  overflow: hidden;
`;

const StyledNavLink = styled(NavLink)`
  display: block;
  text-decoration: none;
  color: white;
  padding: 0.5rem;

  &.active {
    color: grey;
    cursor: none;
  }
`;

const Navbar = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <NavContainer>
      <NavLogo src={Logo} />
      <NavTitle>Bottle Bank</NavTitle>
      <div onClick={() => setOpen(!open)}>{open ? "✖" : "☰"}</div>
      <LinksContainer open={open}>
        <StyledNavLink exact to="/" onClick={() => setOpen(false)}>
          Home
        </StyledNavLink>
        <StyledNavLink to="/expenses" onClick={() => setOpen(false)}>
          Expenses
        </StyledNavLink>
      </LinksContainer>
    </NavContainer>
  );
};

export default Navbar;
