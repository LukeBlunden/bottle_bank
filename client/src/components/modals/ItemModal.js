import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { useDispatch } from "react-redux";
import { addExpenseItem } from "../../actions/expensesActions";
import { addIncomeItem } from "../../actions/incomeActions";

const ItemModal = ({ open, closeHandler, id, categories, role }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(null);
  const [category, setCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const newItem = {
      description,
      amount,
      category,
      selectedDate,
      id,
    };
    role === "expense"
      ? dispatch(addExpenseItem(newItem))
      : dispatch(addIncomeItem(newItem));
    closeHandler();
  };

  return (
    <Dialog open={open} onClose={closeHandler}>
      <form onSubmit={formSubmitHandler}>
        <DialogContent>
          <TextField
            label="Description"
            margin="dense"
            type="text"
            fullWidth
            autoFocus
            id="name"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              {categories.map((category) => (
                <MenuItem key={category.name} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Amount"
            margin="dense"
            type="number"
            fullWidth
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
          <Button type="submit">Submit</Button>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default ItemModal;