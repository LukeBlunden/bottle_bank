import React, { useState } from "react";
import axios from "axios";
import { Dialog, DialogContent, TextField, Button } from "@material-ui/core";

const ListItemModal = (props) => {
  const [name, setName] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    axios.post("/api/lists/list", { name, id: props.id });
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

export default ListItemModal;
