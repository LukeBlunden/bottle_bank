import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLists } from "../actions/listActions";

import List from "./List";
import FormModal from "./modals/FormModal";

const ExpensesContainer = (props) => {
  const dispatch = useDispatch();
  const { lists, loading } = useSelector((state) => state.lists);

  useEffect(() => {
    dispatch(getLists());
  }, [dispatch]);

  return (
    <React.Fragment>
      <FormModal />
      {loading && <p>Loading...</p>}
      {lists.map((list) => (
        <List key={list._id} list={list} />
      ))}
    </React.Fragment>
  );
};

export default ExpensesContainer;
