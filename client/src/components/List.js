import React, { useState } from "react";
import { Container, Typography, Card, Button } from "@material-ui/core";
import ListItemModal from "./modals/ListItemModal";

const List = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <Container style={{ marginBottom: "10px" }}>
      <Card>
        <Typography variant="caption">{props.list.name}</Typography>
        <br />
        <Typography variant="caption">
          Shared: {`${props.list.shared}`}
        </Typography>
        {props.list.items.map((item) => (
          <p key={item.name}>{item.name}</p>
        ))}
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          +
        </Button>
        <ListItemModal
          open={open}
          closeHandler={() => setOpen(false)}
          id={props.list._id}
        />
      </Card>
    </Container>
  );
};

export default List;
