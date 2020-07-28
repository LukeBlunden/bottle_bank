import React, { useState } from "react";
import { Dialog, DialogContent, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { addSharedUser } from "../../actions/expensesActions";

const CategoryModal = ({ id, closeHandler, open }) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addSharedUser({ email, id }));
    // closeHandler();
  };

  return (
    <Dialog open={open} onClose={closeHandler}>
      <form onSubmit={formSubmitHandler}>
        <DialogContent>
          <TextField
            label="User email"
            margin="dense"
            type="text"
            fullWidth
            autoFocus
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">Add user</Button>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CategoryModal;
