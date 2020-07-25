import React, { useState } from "react";
import styled from "styled-components";
import ListCategoryModal from "./modals/ListCategoryModal";
import AddExpenseModal from "./modals/AddExpenseModal";
import ListTable from "./ListTable";
import Button from "./UI/Button";

import { useDispatch } from "react-redux";
import { deleteList } from "../actions/listActions";

const ListContainer = styled.div`
  margin: 20px 20px 10px 20px;
  padding: 10px;
  border-radius: 15px;
  background-color: #2f2d52;
`;

const ListPanel = styled.div`
  width: 100%;
  padding: 10px;
  background-color: ${(props) => props.color};
  border-radius: 10px;
`;

const List = (props) => {
  const [catOpen, setCatOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <ListContainer>
      <ListPanel color="#deddec">
        <h1>{props.list.name}</h1>
        <Button onClick={() => dispatch(deleteList({ id: props.list._id }))}>
          Delete List
        </Button>
        <br />
        {/* <h2>Shared: {`${props.list.shared}`}</h2> */}
        <ListTable
          categories={props.list.categories}
          expenseLog={props.list.expenseLog}
          currency={props.list.currency}
        />
        <br />
        <Button onClick={() => setCatOpen(true)}>+ category</Button>
        <ListCategoryModal
          open={catOpen}
          closeHandler={() => setCatOpen(false)}
          id={props.list._id}
        />
        <Button onClick={() => setItemOpen(true)}>+ item</Button>
        <AddExpenseModal
          open={itemOpen}
          closeHandler={() => setItemOpen(false)}
          id={props.list._id}
          categories={props.list.categories}
        />
      </ListPanel>
    </ListContainer>
  );
};

export default List;
