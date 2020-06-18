import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLists } from "../actions/listActions";

import List from "./List";

const ListTables = (props) => {
  const dispatch = useDispatch();
  const { lists, loading } = useSelector((state) => state.lists);

  useEffect(() => {
    dispatch(getLists());
  }, [dispatch]);

  return (
    <React.Fragment>
      {loading && <p>Loading...</p>}
      {lists.map((list) => (
        <List key={list._id} list={list} />
      ))}
    </React.Fragment>
  );
};

export default ListTables;
