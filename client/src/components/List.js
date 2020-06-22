import React, { useState } from "react";
import { Container, Typography, Card, Button } from "@material-ui/core";
import ListCategoryModal from "./modals/ListCategoryModal";
import AddExpenseModal from "./modals/AddExpenseModal";
import ListTable from "./ListTable";

const List = (props) => {
  const [catOpen, setCatOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);

  return (
    <Container style={{ marginBottom: "10px" }}>
      <Card>
        <Typography variant="caption">{props.list.name}</Typography>
        <br />
        <Typography variant="caption">
          Shared: {`${props.list.shared}`}
        </Typography>
        <ListTable
          categories={props.list.categories}
          expenseLog={props.list.expenseLog}
          currency={props.list.currency}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setCatOpen(true)}
        >
          + category
        </Button>
        <ListCategoryModal
          open={catOpen}
          closeHandler={() => setCatOpen(false)}
          id={props.list._id}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setItemOpen(true)}
        >
          + item
        </Button>
        <AddExpenseModal
          open={itemOpen}
          closeHandler={() => setItemOpen(false)}
          id={props.list._id}
          categories={props.list.categories}
        />
      </Card>
    </Container>
  );
};

export default List;
