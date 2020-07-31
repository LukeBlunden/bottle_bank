import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../../actions/authActions";

const Login = ({ hide }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { msg, id } = useSelector((state) => state.error);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    id === "LOGIN_FAIL" ? setErrorMsg(msg) : setErrorMsg(null);
  }, [msg, id]);

  useEffect(() => {
    if (isAuthenticated) {
      setEmail("");
      setPassword("");
      hide();
    }
  }, [isAuthenticated, hide]);

  return (
    <form onSubmit={formSubmitHandler}>
      {errorMsg ? <p>{errorMsg}</p> : null}
      <input
        type="text"
        placeholder="User Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        autoComplete="on"
      />
      <input
        type="password"
        placeholder="User Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
