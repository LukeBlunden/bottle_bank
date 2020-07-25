import React, { useState } from "react";
import { Dialog, DialogContent, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addExpenseCategory } from "../../actions/expensesActions";

const CategoryModal = (props) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addExpenseCategory({ name, id: props.id }));
    props.closeHandler();
  };

  return (
    <Dialog open={props.open} onClose={props.closeHandler}>
      <form onSubmit={formSubmitHandler}>
        <DialogContent>
          <TextField
            label="Item name"
            margin="dense"
            type="text"
            fullWidth
            autoFocus
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button type="submit">Submit</Button>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CategoryModal;
