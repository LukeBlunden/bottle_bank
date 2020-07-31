import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const currencies = [
  { value: "USD", label: "$" },
  { value: "EUR", label: "€" },
  { value: "GBP", label: "£" },
  { value: "BTC", label: "฿" },
  { value: "JPY", label: "¥" },
];

const AddGroup = ({ hide, dispatchMethod }) => {
  const [newList, setNewList] = useState({
    name: "",
    currency: "",
    shared: false,
  });

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(dispatchMethod(newList, { id: user._id, name: user.name }));
    hide();
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <input
        type="text"
        placeholder="Group Name"
        value={newList.name}
        onChange={(e) => setNewList({ ...newList, name: e.target.value })}
        autoFocus
      />

      <select
        name="currencies"
        id="currency-select"
        value={newList.currency}
        onChange={(e) => setNewList({ ...newList, currency: e.target.value })}
        required
      >
        <option value="">Please choose a currency</option>
        {currencies.map((currency) => (
          <option key={currency.value} value={currency.value}>
            {currency.label}
          </option>
        ))}
      </select>

      <input
        type="checkbox"
        name="shared"
        id="shared"
        checked={newList.shared}
        onChange={() => setNewList({ ...newList, shared: !newList.shared })}
      />
      <label htmlFor="shared">Shared</label>

      <button type="submit">Add Group</button>
    </form>
  );
};

export default AddGroup;
