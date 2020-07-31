import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, TextField, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../actions/authActions";

const LoginModal = ({ closeHandler, open }) => {
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
      closeHandler();
    }
  }, [isAuthenticated, closeHandler]);

  return (
    <Dialog open={open} onClose={closeHandler}>
      <form onSubmit={formSubmitHandler}>
        <DialogContent>
          {errorMsg ? <p>{errorMsg}</p> : null}
          <TextField
            label="Email"
            margin="dense"
            type="email"
            autoFocus
            fullWidth
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            margin="dense"
            type="password"
            fullWidth
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Login</Button>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default LoginModal;
