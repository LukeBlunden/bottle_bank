import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, TextField, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import { register } from "../../actions/authActions";

const RegisterModal = ({ closeHandler, open }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { msg, status, id } = useSelector((state) => state.error);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  };

  useEffect(() => {
    id === "REGISTER_FAIL" ? setErrorMsg(msg) : setErrorMsg(null);
  }, [msg]);

  useEffect(() => {
    if (isAuthenticated) {
      setName("");
      setEmail("");
      setPassword("");
      closeHandler();
    }
  }, [isAuthenticated]);

  return (
    <Dialog open={open} onClose={closeHandler}>
      <form onSubmit={formSubmitHandler}>
        <DialogContent>
          {errorMsg ? <p>{errorMsg}</p> : null}
          <TextField
            label="Name"
            margin="dense"
            type="text"
            fullWidth
            autoFocus
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            margin="dense"
            type="email"
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
          <Button type="submit">Register</Button>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default RegisterModal;
