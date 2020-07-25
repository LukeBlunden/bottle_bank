import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExpenses } from "../actions/expensesActions";

import ExpenseCard from "./ExpenseCard";
import CardModal from "./modals/CardModal";

const ExpensesContainer = (props) => {
  const dispatch = useDispatch();
  const { expenses, loading } = useSelector((state) => state.expenses);

  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  return (
    <React.Fragment>
      <CardModal />
      {loading && <p>Loading...</p>}
      {expenses.map((expense) => (
        <ExpenseCard key={expense._id} list={expense} />
      ))}
    </React.Fragment>
  );
};

export default ExpensesContainer;
