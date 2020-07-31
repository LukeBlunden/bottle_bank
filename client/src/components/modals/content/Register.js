import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../../../actions/authActions";

const Register = ({ hide }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { msg, id } = useSelector((state) => state.error);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  useEffect(() => {
    id === "REGISTER_FAIL" ? setErrorMsg(msg) : setErrorMsg(null);
  }, [msg, id]);

  useEffect(() => {
    if (isAuthenticated) {
      setName("");
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
      />
      <input
        type="text"
        placeholder="User Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
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

export default Register;
