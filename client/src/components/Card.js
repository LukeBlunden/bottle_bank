import React, { useState } from "react";
import styled from "styled-components";
import { isThisMonth } from "date-fns";
import { useSelector } from "react-redux";

import AddCategory from "./modals/content/AddCategory";
import AddItem from "./modals/content/AddItem";
import AddUserModal from "./modals/AddUserModal";
import Modal from "./modals/Modal";
import Table from "./Table";
import Button from "./UI/Button";

import { useDispatch } from "react-redux";
import { deleteExpenseGroup } from "../actions/expensesActions";
import { deleteIncomeGroup } from "../actions/incomeActions";

const ListContainer = styled.div`
  margin: 20px 20px 10px 20px;
  border: var(--border-primary) solid var(--col-dark-grey);
  border-radius: 15px;
  background-color: var(--col-dark-grey);
`;

const ListPanel = styled.div`
  width: 100%;
  background-color: ${(props) => props.color};
  border-radius: var(--border-radius-card);
`;

const HeadingGroup = styled.div`
  width: 100%;
  border-radius: var(--border-radius-card) var(--border-radius-card) 0 0;
  background-color: var(--col-dark-bg);
  border-bottom: var(--border-primary) solid var(--col-dark-grey);
  display: grid;
  grid-template-columns: 5fr 25px 1fr;
  align-items: center;
  text-align: left;

  & > h1 {
    border-radius: var(--border-radius-card) 0 0 0;
    background-color: var(--col-dark-bg);
    padding: var(--border-primary) 0 var(--border-primary) 10px;
    font-size: 1.6rem;
    color: var(--col-dark-grey);
  }

  & > p {
    background-color: var(--col-dark-bg);
    text-align: left;
  }

  & > button {
    height: 100%;
    font-size: 1rem;
    border-left: var(--border-primary) solid var(--col-dark-grey);
    border-radius: 0 var(--border-radius-card) 0 0;
  }
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

const SharedUserPanel = styled.div`
  /* padding: 10px; */
  border: 3px solid var(--col-dark-grey);
  border-radius: var(--border-radius-card);
  display: flex;
  flex-direction: column;
  background-color: var(--col-dark-bg);
  border: var(--border-primary) solid var(--col-dark-grey);
  font-weight: bold;
  margin: 10px 10px 10px 10px;

  & > div {
    width: 100%;
    padding: 10px;
    background-color: ${(props) => props.color};
    display: flex;
    justify-content: space-between;

    &:first-child {
      border-radius: var(--border-radius-card) var(--border-radius-card) 0 0;
    }

    &:last-child {
      border-radius: 0 0 var(--border-radius-card) var(--border-radius-card);
    }

    &:not(:last-child) {
      border-bottom: var(--border-primary) solid var(--col-dark-grey);
    }
  }
`;

const currencies = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  BTC: "฿",
  JPY: "¥",
};

const Card = ({ list, role }) => {
  const { expenses, loading } = useSelector((state) => state.expenses);

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
          <p>{list.shared ? "👥" : "👤"}</p>
          <Button
            onClick={() => deleteGroup(list._id)}
            color="var(--col-main-neg)"
          >
            ✖
          </Button>
        </HeadingGroup>

        <Table
          categories={list.categories}
          log={list.log}
          currencySymbol={currencies[list.currency]}
        />

        {list.shared && (
          <SharedUserPanel color="var(--col-dark-bg)">
            {list.users.map((user) => (
              <div>
                <p>{user.name}</p>
                <p>
                  {currencies[list.currency]}
                  {expenses.reduce((acc, group) => {
                    for (let log of group.log) {
                      if (
                        isThisMonth(new Date(log.selectedDate)) &&
                        log.payer === user.id
                      ) {
                        acc += parseFloat(log.amount, 10);
                      }
                    }
                    return acc;
                  }, 0)}
                </p>
              </div>
            ))}
          </SharedUserPanel>
        )}

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
