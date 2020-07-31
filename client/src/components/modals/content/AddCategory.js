import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addExpenseCategory } from "../../../actions/expensesActions";
import { addIncomeCategory } from "../../../actions/incomeActions";

const AddCategory = ({ role, id, hide }) => {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    role === "expense"
      ? dispatch(addExpenseCategory({ name, id }))
      : dispatch(addIncomeCategory({ name, id }));
    hide();
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <input
        type="text"
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoFocus
      />
      <button type="submit">Submit Category</button>
    </form>
  );
};

export default AddCategory;
