import React, { useState } from "react";
import { Dialog, DialogContent, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { addExpenseCategory } from "../../actions/expensesActions";
import { addIncomeCategory } from "../../actions/incomeActions";

const CategoryModal = ({ id, closeHandler, open, role }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    role === "expense"
      ? dispatch(addExpenseCategory({ name, id }))
      : dispatch(addIncomeCategory({ name, id }));
    closeHandler();
  };

  return (
    <Dialog open={open} onClose={closeHandler}>
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
