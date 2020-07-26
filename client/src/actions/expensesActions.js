import axios from "axios";
import {
  GET_EXPENSES,
  ADD_EXPENSE_CARD,
  LOADING_EXPENSES,
  ADD_EXPENSE_CATEGORY,
  ADD_EXPENSE_ITEM,
  DELETE_EXPENSE_CARD,
} from "./types";

export const getExpenses = () => (dispatch) => {
  dispatch({ type: LOADING_EXPENSES });
  axios
    .get("/api/expenses")
    .then((res) => dispatch({ type: GET_EXPENSES, payload: res.data }))
    .catch((err) => console.log(err));
};

export const addExpenseCard = (newList) => (dispatch) => {
  axios
    .post("/api/expenses", newList)
    .then((res) => dispatch({ type: ADD_EXPENSE_CARD, payload: res.data }))
    .catch((err) => console.log(err));
};

export const deleteExpenseCard = (listId) => (dispatch) => {
  axios
    .delete("/api/expenses", { data: listId })
    .then((res) => dispatch({ type: DELETE_EXPENSE_CARD, payload: res.data }))
    .catch((err) => console.log(err));
};

export const addExpenseCategory = (item) => (dispatch) => {
  axios
    .post("/api/expenses/category", item)
    .then((res) => dispatch({ type: ADD_EXPENSE_CATEGORY, payload: res.data }))
    .catch((err) => console.log(err));
};

export const addExpenseItem = (expense) => (dispatch) => {
  axios
    .post("/api/expenses/item", expense)
    .then((res) => dispatch({ type: ADD_EXPENSE_ITEM, payload: res.data }))
    .catch((err) => console.log(err));
};
