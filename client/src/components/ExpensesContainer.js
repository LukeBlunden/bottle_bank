import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpenses, addExpenseGroup } from "../actions/expensesActions";

import Card from "./Card";
import CardModal from "./modals/CardModal";

const ExpensesContainer = (props) => {
  const dispatch = useDispatch();
  const { expenses, loading } = useSelector((state) => state.expenses);

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  return (
    <React.Fragment>
      <CardModal dispatchMethod={addExpenseGroup}>Add Expense Group</CardModal>
      {loading && <p>Loading...</p>}
      {expenses.map((expense) => (
        <Card key={expense._id} list={expense} role="expense" />
      ))}
    </React.Fragment>
  );
};

export default ExpensesContainer;
