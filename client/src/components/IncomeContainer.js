import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getIncome, addIncomeGroup } from "../actions/incomeActions";

import CardModal from "./modals/CardModal";
import Card from "./Card";

const IncomeContainer = (props) => {
  const dispatch = useDispatch();
  const { income, loading } = useSelector((state) => state.income);
  const { _id } = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (income.length === 0) {
      dispatch(getIncome(_id));
    }
  }, [dispatch, _id, income.length]);

  return (
    <React.Fragment>
      <CardModal dispatchMethod={addIncomeGroup}>Add Income Group</CardModal>
      {loading && <p>Loading...</p>}
      {income.map((group) => (
        <Card key={group._id} list={group} role="income" />
      ))}
    </React.Fragment>
  );
};

export default IncomeContainer;
