import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

import Button from "../UI/Button";

import { addList } from "../../actions/listActions";

const currencies = [
  { value: "USD", label: "$" },
  { value: "EUR", label: "€" },
  { value: "GBP", label: "£" },
  { value: "BTC", label: "฿" },
  { value: "JPY", label: "¥" },
];

const FormModal = (props) => {
  const [newList, setNewList] = useState({
    name: "",
    currency: "",
    shared: false,
  });
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addList(newList));
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={() => setOpen(true)}>Add list</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <form onSubmit={formSubmitHandler}>
          <DialogTitle>New list</DialogTitle>
          <DialogContent>
            <TextField
              label="List name"
              margin="dense"
              type="text"
              fullWidth
              id="name"
              value={newList.name}
              onChange={(e) => setNewList({ ...newList, name: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>List currency</InputLabel>
              <Select
                onChange={(e) =>
                  setNewList({ ...newList, currency: e.target.value })
                }
                value={newList.currency}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <FormControlLabel
                control={
                  <Switch
                    checked={newList.shared}
                    onChange={() =>
                      setNewList({ ...newList, shared: !newList.shared })
                    }
                  />
                }
                label="Shared"
              />
            </FormControl>
            <Button type="submit">Submit</Button>
          </DialogContent>
        </form>
      </Dialog>
    </React.Fragment>
  );
};

export default FormModal;
