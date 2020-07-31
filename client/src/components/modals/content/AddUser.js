import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addSharedUser } from "../../../actions/expensesActions";

const AddUser = ({ id, hide }) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addSharedUser({ email, id }));
    hide();
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <input
        type="text"
        placeholder="User Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;
