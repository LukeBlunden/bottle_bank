import React, { useState } from "react";
import styled from "styled-components";
import CategoryModal from "./modals/CategoryModal";
import ItemModal from "./modals/ItemModal";
import Table from "./Table";
import Button from "./UI/Button";

import { useDispatch } from "react-redux";
import { deleteExpenseCard } from "../actions/expensesActions";
import { deleteIncomeGroup } from "../actions/incomeActions";

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

const Card = ({ list, role }) => {
  const [catOpen, setCatOpen] = useState(false);
  const [itemOpen, setItemOpen] = useState(false);
  const dispatch = useDispatch();

  const deleteGroup = (id) => {
    role === "expense"
      ? dispatch(deleteExpenseCard({ id }))
      : dispatch(deleteIncomeGroup({ id }));
  };

  return (
    <ListContainer>
      <ListPanel color="#deddec">
        <h1>{list.name}</h1>
        <Button onClick={() => deleteGroup(list._id)}>Delete List</Button>
        <br />
        {/* <h2>Shared: {`${list.shared}`}</h2> */}
        <Table
          categories={list.categories}
          log={list.log}
          currency={list.currency}
        />
        <br />
        <Button onClick={() => setCatOpen(true)}>+ category</Button>
        <CategoryModal
          open={catOpen}
          closeHandler={() => setCatOpen(false)}
          id={list._id}
          role={role}
        />
        <Button onClick={() => setItemOpen(true)}>+ item</Button>
        <ItemModal
          open={itemOpen}
          closeHandler={() => setItemOpen(false)}
          id={list._id}
          categories={list.categories}
          role={role}
        />
      </ListPanel>
    </ListContainer>
  );
};

export default Card;
