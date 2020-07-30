import React, { useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";

import { addExpenseItem } from "../../../actions/expensesActions";
import { addIncomeItem } from "../../../actions/incomeActions";

const DatePickerPanel = styled.div`
  display: flex;
`;

const CalendarContainer = styled.div`
  padding: ${(props) => (props.open ? "10px" : "0")};
  overflow: hidden;

  & .calendar {
    max-height: ${(props) => (props.open ? "12rem" : "0")};
    & button {
      background-color: white;
      border: none;
      padding: 5px;
    }

    & abbr {
      /* color: white; */
    }
  }
`;

const AddItem = ({ hide, id, categories, role, users }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [payer, setPayer] = useState(user._id);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const newItem = {
      description,
      amount,
      category,
      payer,
      selectedDate,
      id,
    };
    role === "expense"
      ? dispatch(addExpenseItem(newItem))
      : dispatch(addIncomeItem(newItem));
    hide();
    setDescription("");
    setAmount("");
    setCategory("");
    setSelectedDate(new Date());
    setCalendarOpen(false);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        name="categories"
        id="category-select"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      >
        <option value="">Please choose a category</option>
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <select
        name="payer"
        id="payer-select"
        value={payer}
        onChange={(e) => setPayer(e.target.value)}
        required
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name.replace(/ .*/, "")}
          </option>
        ))}
      </select>
      <input
        type="number"
        name="amount"
        id="amount-select"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <DatePickerPanel onClick={() => setCalendarOpen(!calendarOpen)}>
        <p>{format(selectedDate, "dd/MM/yy")}</p>
        <p>📅</p>
      </DatePickerPanel>
      <CalendarContainer open={calendarOpen}>
        <Calendar
          className="calendar"
          onChange={(date) => setSelectedDate(date)}
          value={selectedDate}
        />
      </CalendarContainer>
      <button type="submit">Submit Item</button>
    </form>
  );
};

export default AddItem;
