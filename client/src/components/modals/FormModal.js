import React, { useState } from "react";
import axios from "axios";
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
  Button,
} from "@material-ui/core";

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

  const formSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("/api/lists", newList)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    props.closeHandler();
  };

  return (
    <Dialog open={props.open} onClose={props.closeHandler}>
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
  );
};

export default FormModal;
