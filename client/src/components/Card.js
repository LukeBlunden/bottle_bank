import React, { useState } from "react";
import styled from "styled-components";
import { isThisMonth } from "date-fns";
import { useDispatch } from "react-redux";

import AddCategory from "./modals/content/AddCategory";
import AddItem from "./modals/content/AddItem";
import AddUser from "./modals/content/AddUser";
import Modal from "./modals/Modal";
import Table from "./Table";
import Button from "./UI/Button";
import Icon from "./UI/Icon";

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

const Svg = styled(Icon)`
  height: 20px;
  width: 20px;
  color: var(--col-lighter-pos);
  &:hover,
  &:active {
    color: var(--col-lightest-pos);
  }
`;

const currencies = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  BTC: "฿",
  JPY: "¥",
};

const Card = ({ group, role }) => {
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
          <h1>{group.name}</h1>
          <p>{group.shared ? "👥" : "👤"}</p>
          <Button
            onClick={() => deleteGroup(group._id)}
            color="var(--col-main-neg)"
          >
            ✖
          </Button>
        </HeadingGroup>

        <Table
          categories={group.categories}
          log={group.log}
          currencySymbol={currencies[group.currency]}
        />

        {group.shared && (
          <SharedUserPanel color="var(--col-dark-bg)">
            {group.users.map((user) => (
              <div key={user.id}>
                <p>{user.name}</p>
                <p>
                  {currencies[group.currency]}
                  {group.log.reduce((acc, log) => {
                    if (
                      (isThisMonth(new Date(log.selectedDate)) ||
                        log.recurring) &&
                      log.payer === user.id
                    ) {
                      acc += parseFloat(log.amount, 10);
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
          {group.shared && (
            <Button onClick={() => setUserOpen(true)}>
              <Svg viewBox="0 0 20 20">
                <g fill="none" fillRule="evenodd">
                  <g transform="translate(-60 -2119)" fill="currentColor">
                    <g transform="translate(56 160)">
                      <path d="m20.038 1959c-0.0030104 0-0.0060209 2e-3 -0.0090313 2e-3 -0.0030105 0-0.0050174-2e-3 -0.0080279-2e-3h0.017059zm3.9617 4c0 0.552-0.44956 1-1.0035 1h-1.9377v2c0 0.552-0.46662 1-1.0205 1h-0.017059c-0.55493 0-0.96936-0.448-0.96936-1v-2h-2.0762c-0.55392 0-1.0035-0.448-1.0035-1s0.44956-1 1.0035-1h2.0762v-2c0-0.549 0.42748-0.993 0.97739-0.998 0.55091 5e-3 1.0296 0.449 1.0296 0.998v2h1.9377c0.55392 0 1.0035 0.448 1.0035 1zm-12 7.902c-0.014049 0-0.028098-2e-3 -0.042146-2e-3s-0.028098 2e-3 -0.042146 2e-3c-1.0868-0.023-1.9648-0.907-1.9648-1.996 0-1.103 0.90012-2 2.007-2s2.007 0.897 2.007 2c0 1.089-0.87805 1.973-1.9648 1.996zm2.9944 0.593c0.83189-0.968 1.2333-2.315 0.80178-3.771-0.39838-1.344-1.5323-2.404-2.9041-2.713-2.6231-0.589-4.9482 1.382-4.9482 3.895 0 0.993 0.37631 1.89 0.97739 2.589-2.592 1.055-4.5076 3.502-4.912 6.372-0.084293 0.599 0.39638 1.133 1.0025 1.133 0.49572 0 0.91518-0.363 0.98542-0.853 0.41343-2.907 2.9071-5.224 5.9185-5.245 0.014049 0 0.027094 4e-3 0.042146 4e-3 0.014049 0 0.028098-4e-3 0.042146-4e-3 3.0115 0.021 5.5051 2.338 5.9185 5.246 0.06924 0.489 0.4887 0.852 0.98542 0.852 0.6061 0 1.0868-0.534 1.0025-1.132-0.4044-2.87-2.3201-5.317-4.912-6.373z" />
                    </g>
                  </g>
                </g>
              </Svg>
            </Button>
          )}
        </ButtonGroup>

        {categoryOpen && (
          <Modal open={categoryOpen} hide={() => setCategoryOpen(false)}>
            <AddCategory
              role={role}
              id={group._id}
              hide={() => setCategoryOpen(false)}
            />
          </Modal>
        )}
        {itemOpen && (
          <Modal open={itemOpen} hide={() => setItemOpen(false)}>
            <AddItem
              role={role}
              id={group._id}
              hide={() => setItemOpen(false)}
              categories={group.categories}
              users={group.users}
            />
          </Modal>
        )}
        {group.shared && userOpen && (
          <Modal open={userOpen} hide={() => setUserOpen(false)}>
            <AddUser id={group._id} hide={() => setUserOpen(false)} />
          </Modal>
        )}
      </ListPanel>
    </ListContainer>
  );
};

export default Card;
