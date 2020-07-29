import React, { useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";
// import DateFnsUtils from "@date-io/date-fns";
import { useDispatch } from "react-redux";
import Calendar from "react-calendar";
import { addExpenseItem } from "../../../actions/expensesActions";
import { addIncomeItem } from "../../../actions/incomeActions";

const CalendarContainer = styled.div`
  & > .calendar {
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

const AddItem = ({ open, closeHandler, id, categories, role }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(null);
  const [category, setCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dispatch = useDispatch();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const newItem = {
      description,
      amount,
      category,
      selectedDate,
      id,
    };
    role === "expense"
      ? dispatch(addExpenseItem(newItem))
      : dispatch(addIncomeItem(newItem));
    closeHandler();
  };

  return (
    <form>
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
      <input
        type="date"
        name="expense-date"
        id="date-select"
        value={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      />
      <CalendarContainer>
        <Calendar className="calendar" />
      </CalendarContainer>
      <button type="submit">Submit Item</button>
    </form>
  );
};

export default AddItem;
