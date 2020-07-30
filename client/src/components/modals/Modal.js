import React, { useState } from "react";
import styled from "styled-components";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--col-dark-grey);
  opacity: 0.3;
  display: ${(props) => (props.open ? "initial" : "none")};
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  padding: var(--border-primary);
  border-radius: var(--border-radius-card);
  background-color: var(--col-dark-grey);
  display: ${(props) => (props.open ? "initial" : "none")};

  & input {
    width: 100%;
    padding: 10px;
    border: none;
    background-color: var(--col-dark-bg);

    &:not(:last-child) {
      margin-bottom: var(--border-primary);
    }

    &:first-child {
      border-radius: var(--border-radius-card-small)
        var(--border-radius-card-small) 0 0;
    }

    &::placeholder {
      color: var(--col-med-light-grey);
    }
  }

  & > form > button {
    background-color: var(--col-main-pos);
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: var(--border-radius-card-small);

    &:last-child {
      border-radius: 0 0 10px 10px;
    }
  }
`;

const Modal = ({ open, hide, children }) => {
  return (
    <React.Fragment>
      <ModalBackdrop open={open} onClick={hide} />
      <ModalContainer open={open}>{children}</ModalContainer>
    </React.Fragment>
  );
};

export default Modal;
