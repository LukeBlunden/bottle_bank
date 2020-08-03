import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getIncome, addIncomeGroup } from "../actions/incomeActions";

import Card from "./Card";
import Modal from "./modals/Modal";
import AddGroup from "./modals/content/AddGroup";
import Button from "./UI/Button";

const IncomeContainer = (props) => {
  const [groupOpen, setGroupOpen] = useState(false);

  const dispatch = useDispatch();
  const { income, loading } = useSelector((state) => state.income);
  const { user, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (income.length === 0 && isLoading === false) {
      dispatch(getIncome(user._id));
    }
  }, [dispatch, user._id, income.length, isLoading]);

  return (
    <React.Fragment>
      <Button onClick={() => setGroupOpen(true)}>Add Income Group</Button>
      {groupOpen && (
        <Modal open={groupOpen} hide={() => setGroupOpen(false)}>
          <AddGroup
            hide={() => setGroupOpen(false)}
            dispatchMethod={addIncomeGroup}
          />
        </Modal>
      )}
      {loading && <p>Loading...</p>}
      {income.map((group) => (
        <Card key={group._id} group={group} role="income" />
      ))}
    </React.Fragment>
  );
};

export default IncomeContainer;
