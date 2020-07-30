import React, { useState } from "react";
import styled from "styled-components";
import CategoryModal from "./modals/CategoryModal";
import AddCategory from "./modals/content/AddCategory";
import AddItem from "./modals/content/AddItem";
import ItemModal from "./modals/ItemModal";
import AddUserModal from "./modals/AddUserModal";
import Modal from "./modals/Modal";
import Table from "./Table";
import Button from "./UI/Button";

import { useDispatch } from "react-redux";
import { deleteExpenseGroup } from "../actions/expensesActions";
import { deleteIncomeGroup } from "../actions/incomeActions";

const ListContainer = styled.div`
  margin: 20px 20px 10px 20px;
  padding: var(--border-primary);
  border-radius: 15px;
  background-color: var(--col-dark-grey);
`;

const ListPanel = styled.div`
  width: 100%;
  /* padding: 10px; */
  background-color: ${(props) => props.color};
  border-radius: var(--border-radius-card);
`;

const ButtonGroup = styled.div`
  width: 100%;
  background-color: var(--col-dark-grey);
  padding-top: var(--border-primary);
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  gap: var(--border-primary);
  border-radius: 0 0 var(--border-radius-card) var(--border-radius-card);

  & button:first-child {
    border-radius: 0 0 0 var(--border-radius-card);
  }

  & button:last-child {
    border-radius: 0 0 var(--border-radius-card) 0;
  }
`;

const HeadingGroup = styled.div`
  width: 100%;
  border-radius: var(--border-radius-card) var(--border-radius-card) 0 0;
  padding-bottom: var(--border-primary);
  background-color: var(--col-dark-grey);
  display: grid;
  grid-template-columns: 5fr 1fr;
  align-items: center;
  text-align: left;
  gap: var(--border-primary);

  & > h1 {
    border-radius: var(--border-radius-card) 0 0 0;
    background-color: var(--col-dark-bg);
    padding: var(--border-primary) 0 var(--border-primary) 10px;
    font-size: 1.6rem;
    color: var(--col-dark-grey);
  }

  & > button {
    height: 100%;
    font-size: 1rem;
    border-radius: 0 var(--border-radius-card) 0 0;
  }
`;

const Card = ({ list, role }) => {
  const [itemOpen, setItemOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const dispatch = useDispatch();

  const deleteGroup = (id) => {
    role === "expense"
      ? dispatch(deleteExpenseGroup(id))
      : dispatch(deleteIncomeGroup(id));
  };

  return (
    <ListContainer>
      <ListPanel color="var(--col-dark-bg)">
        <HeadingGroup>
          <h1>{list.name}</h1>
          <Button
            onClick={() => deleteGroup(list._id)}
            color="var(--col-main-neg)"
          >
            ✖
          </Button>
        </HeadingGroup>
        <br />
        {/* <h2>Shared: {`${list.shared}`}</h2> */}
        <Table
          categories={list.categories}
          log={list.log}
          currency={list.currency}
        />
        <br />

        <ButtonGroup>
          <Button onClick={() => setCategoryOpen(true)}>+ Category</Button>
          <Button onClick={() => setItemOpen(true)}>+ item</Button>
          {list.shared && (
            <Button onClick={() => setUserOpen(true)}>+ user</Button>
          )}
        </ButtonGroup>

        <Modal open={categoryOpen} hide={() => setCategoryOpen(false)}>
          <AddCategory
            role={role}
            id={list._id}
            hide={() => setCategoryOpen(false)}
          />
        </Modal>
        <Modal open={itemOpen} hide={() => setItemOpen(false)}>
          <AddItem
            role={role}
            id={list._id}
            hide={() => setItemOpen(false)}
            categories={list.categories}
            users={list.users}
          />
        </Modal>
        {/* <ItemModal
          open={itemOpen}
          closeHandler={() => setItemOpen(false)}
          id={list._id}
          categories={list.categories}
          role={role}
        /> */}
        {list.shared && (
          <React.Fragment>
            <AddUserModal
              open={userOpen}
              id={list._id}
              closeHandler={() => setUserOpen(false)}
            />
          </React.Fragment>
        )}
      </ListPanel>
    </ListContainer>
  );
};

export default Card;
