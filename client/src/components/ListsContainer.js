import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "./List";

const ListTables = (props) => {
  const [lists, setList] = useState([]);

  useEffect(() => {
    axios.get("/api/lists").then((res) => setList(res.data));
  }, []);

  return (
    <React.Fragment>
      {lists.map((list) => (
        <List key={list._id} list={list} />
      ))}
    </React.Fragment>
  );
};

export default ListTables;
