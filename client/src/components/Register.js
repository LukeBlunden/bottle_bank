import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "./UI/Input";
import Button from "./UI/Button";
import Form from "./Form";

import { register } from "../actions/authActions";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
          dispatch(register(name, email, password));
        }}
      >
        {id === "REGISTER_FAIL" ? msg : null}
        <Input
          name="email"
          label="User Email"
          type="text"
          value={email}
          onChange={setEmail}
          autoFocus
        />
        <Input
          name="name"
          label="User Name"
          type="text"
          value={name}
          onChange={setName}
        />
        <Input
          name="password"
          label="User Password"
          type="password"
          value={password}
          onChange={setPassword}
        />
        <Button type="submit">Register</Button>
      </Form>
    </React.Fragment>
  );
};

export default Register;
