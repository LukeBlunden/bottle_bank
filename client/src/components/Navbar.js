import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { NavLink, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { clearErrors } from "../actions/errorActions";
import { logout } from "../actions/authActions";

import Modal from "./modals/Modal";
import Login from "./modals/content/Login";
import Register from "./modals/content/Register";
import Icon from "./UI/Icon";

const NavContainer = styled.nav`
  display: grid;
  grid-template-columns: 3rem auto 2rem;
  color: #33393c;
  padding: 0.5rem;
  /* background-color: #2f2d52; */
  background-color: var(--col-main-primary);
  margin-bottom: 1rem;
  align-items: center;
  border-bottom: var(--border-primary) solid var(--col-dark-grey);
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
    props.open ? (props.isAuth ? "12em" : "9em") : "0"};
  overflow: hidden;
`;

const StyledNavLink = styled(NavLink)`
  display: block;
  text-decoration: none;
  color: var(--col-lighter-primary);
  padding: 0.5rem;

  &.active {
    color: var(--col-lightest-primary);
    cursor: none;

    & > svg {
      color: inherit;
    }
  }

  & > span {
    margin-left: 10px;
  }
`;

const StyledLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: var(--col-lighter-primary);
  padding: 0.5rem;

  &.active {
    color: var(--col-lightest-primary);
    cursor: none;

    & > svg {
      color: inherit;
    }
  }
`;

const Svg = styled(Icon)`
  /* width: 17px; */
  /* height: 12px; */
  color: white;
  opacity: 80%;
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
        to="#"
        onClick={() => {
          setOpen(false);
          setRegOpen(true);
        }}
      >
        Register
      </StyledLink>
      {regOpen && (
        <Modal
          open={regOpen}
          hide={() => {
            setRegOpen(false);
            dispatch(clearErrors());
          }}
        >
          <Register
            hide={() => {
              setRegOpen(false);
              dispatch(clearErrors());
            }}
          />
        </Modal>
      )}

      <StyledLink
        to="#"
        onClick={() => {
          setOpen(false);
          setLoginOpen(true);
        }}
      >
        Login
      </StyledLink>
      {loginOpen && (
        <Modal
          open={loginOpen}
          hide={() => {
            setLoginOpen(false);
            dispatch(clearErrors());
          }}
        >
          <Login
            hide={() => {
              setLoginOpen(false);
              dispatch(clearErrors());
            }}
          />
        </Modal>
      )}
    </React.Fragment>
  );

  const authLinks = (
    <React.Fragment>
      {/* <StyledNavLink exact to="/dashboard" onClick={() => setOpen(false)}>
        Dashboard
      </StyledNavLink> */}
      <StyledNavLink to="/expenses" onClick={() => setOpen(false)}>
        -
        <Svg viewBox="0 0 20 12" height="12" width="20">
          <g fill="none" fillRule="evenodd">
            <g transform="translate(-420 -2923)" fill="currentColor">
              <g transform="translate(56 160)">
                <path d="m372 2769c0-1.105 0.895-2 2-2s2 0.895 2 2-0.895 2-2 2-2-0.895-2-2m9 4h-14c-0.552 0-1-0.448-1-1v-6c0-0.552 0.448-1 1-1h14c0.552 0 1 0.448 1 1v6c0 0.552-0.448 1-1 1m-17-8v8c0 1.105 0.895 2 2 2h16c1.105 0 2-0.895 2-2v-8c0-1.105-0.895-2-2-2h-16c-1.105 0-2 0.895-2 2" />
              </g>
            </g>
          </g>
        </Svg>
        <span>Expenses</span>
      </StyledNavLink>
      <StyledNavLink to="/income" onClick={() => setOpen(false)}>
        Income
      </StyledNavLink>
      <StyledLink
        // exact
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
          <Svg viewBox="0 0 17 19" width="17" height="19">
            <g fill="none" fillRule="evenodd">
              <g transform="translate(-341 -720)" fill="currentColor">
                <g transform="translate(56 160)">
                  <path d="m299.88 576.21c0 0.552-0.476 0.788-1.0625 0.788h-1.0625c-0.5865 0-1.0625-0.236-1.0625-0.788v-1c0-1.105-0.95094-2.212-2.125-2.212h-2.125c-1.1741 0-2.125 1.107-2.125 2.212v1c0 0.552-0.476 0.788-1.0625 0.788h-1.0625c-0.5865 0-1.0625-0.236-1.0625-0.788v-8.063c0-0.133 0.056312-0.26 0.15512-0.354l5.4581-5.136c0.41544-0.391 1.088-0.391 1.5024 0l5.4793 5.156c0.098813 0.094 0.15512 0.221 0.15512 0.353v8.044zm2.125-8.587c0-0.265-0.11156-0.518-0.30919-0.706l-6.6927-6.33c-0.82875-0.783-2.1749-0.786-3.0069-6e-3l-6.6789 6.265c-0.19975 0.188-0.31238 0.442-0.31238 0.708v9.656c0 1.105 0.95094 1.788 2.125 1.788h3.1875c1.1741 0 2.125-0.683 2.125-1.788v-1c0-0.552 0.476-1 1.0625-1s1.0625 0.448 1.0625 1v1c0 1.105 0.95094 1.788 2.125 1.788h3.1875c1.1741 0 2.125-0.683 2.125-1.788v-9.587z" />
                </g>
              </g>
            </g>
          </Svg>
          <span>Home</span>
        </StyledNavLink>
        {isAuthenticated ? authLinks : null}
      </LinksContainer>
    </NavContainer>
  );
};

export default Navbar;
