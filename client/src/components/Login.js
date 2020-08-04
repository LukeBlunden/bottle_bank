import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "./UI/Input";
import Button from "./UI/Button";
import Form from "./Form";

import { login } from "../actions/authActions";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { msg, id } = useSelector((state) => state.error);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      {isAuthenticated && <Redirect to="/" />}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(login(email, password));
        }}
      >
        {id === "LOGIN_FAIL" ? msg : null}
        <Input
          name="email"
          label="User Email"
          type="text"
          value={email}
          onChange={setEmail}
          autoFocus
        />
        <Input
          name="password"
          label="User Password"
          type="password"
          value={password}
          onChange={setPassword}
        />
        <Button type="submit">Login</Button>
      </Form>
    </React.Fragment>
  );
};

export default Login;
