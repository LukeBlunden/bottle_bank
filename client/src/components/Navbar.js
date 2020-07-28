import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { clearErrors } from "../actions/errorActions";
import { logout } from "../actions/authActions";

import RegisterModal from "./modals/RegisterModal";
import LoginModal from "./modals/LoginModal";

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
  transition: max-height 0.2s ease-out;
  max-height: ${(props) =>
    props.open ? (props.isAuth ? "15em" : "9em") : "0"};
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

const StyledLink = styled(Link)`
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
  const [regOpen, setRegOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const guestLinks = (
    <React.Fragment>
      <StyledLink
        href="#"
        onClick={() => {
          setOpen(false);
          setRegOpen(true);
        }}
      >
        Register
      </StyledLink>
      <RegisterModal
        open={regOpen}
        closeHandler={() => {
          setRegOpen(false);
          dispatch(clearErrors());
        }}
      />
      <StyledLink
        href="#"
        onClick={() => {
          setOpen(false);
          setLoginOpen(true);
        }}
      >
        Login
      </StyledLink>
      <LoginModal
        open={loginOpen}
        closeHandler={() => {
          setLoginOpen(false);
          dispatch(clearErrors());
        }}
      />
    </React.Fragment>
  );

  const authLinks = (
    <React.Fragment>
      <StyledNavLink exact to="/dashboard" onClick={() => setOpen(false)}>
        Dashboard
      </StyledNavLink>
      <StyledNavLink to="/expenses" onClick={() => setOpen(false)}>
        Expenses
      </StyledNavLink>
      <StyledNavLink to="/income" onClick={() => setOpen(false)}>
        Income
      </StyledNavLink>
      <StyledLink
        exact
        to="/"
        onClick={() => {
          setOpen(false);
          dispatch(logout());
        }}
      >
        Logout
      </StyledLink>
    </React.Fragment>
  );

  return (
    <NavContainer>
      <NavLogo src={Logo} />
      <NavTitle>Bottle Bank</NavTitle>
      <div onClick={() => setOpen(!open)}>{open ? "✖" : "☰"}</div>
      <LinksContainer open={open} isAuth={isAuthenticated}>
        {!isAuthenticated ? guestLinks : null}
        <StyledNavLink exact to="/" onClick={() => setOpen(false)}>
          Home
        </StyledNavLink>
        {isAuthenticated ? authLinks : null}
      </LinksContainer>
    </NavContainer>
  );
};

export default Navbar;
