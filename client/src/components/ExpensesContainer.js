import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpenses, addExpenseGroup } from "../actions/expensesActions";

import Card from "./Card";
import Modal from "./modals/Modal";
import AddGroup from "./modals/content/AddGroup";
import Button from "./UI/Button";

const ExpensesContainer = (props) => {
  const [groupOpen, setGroupOpen] = useState(false);

  const dispatch = useDispatch();
  const { expenses, loading } = useSelector((state) => state.expenses);
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (expenses.length === 0 && isLoading === false) {
      dispatch(getExpenses(user._id));
    }
  }, [dispatch, user._id, expenses.length, isLoading]);

  return (
    <React.Fragment>
      <Button onClick={() => setGroupOpen(true)}>Add Expense Group</Button>
      {groupOpen && (
        <Modal open={groupOpen} hide={() => setGroupOpen(false)}>
          <AddGroup
            hide={() => setGroupOpen(false)}
            dispatchMethod={addExpenseGroup}
          />
        </Modal>
      )}
      {loading && <p>Loading...</p>}
      {expenses.map((expense) => (
        <Card key={expense._id} group={expense} role="expense" />
      ))}
    </React.Fragment>
  );
};

export default ExpensesContainer;
