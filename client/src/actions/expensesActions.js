import axios from "axios";
import {
  GET_EXPENSES,
  ADD_EXPENSE_GROUP,
  LOADING_EXPENSES,
  ADD_EXPENSE_CATEGORY,
  ADD_EXPENSE_ITEM,
  DELETE_EXPENSE_GROUP,
} from "./types";

export const getExpenses = () => (dispatch) => {
  dispatch({ type: LOADING_EXPENSES });
  axios
    .get("/api/expenses")
    .then((res) => dispatch({ type: GET_EXPENSES, payload: res.data }))
    .catch((err) => console.log(err));
};

export const addExpenseGroup = (newList) => (dispatch) => {
  axios
    .post("/api/expenses", newList)
    .then((res) => dispatch({ type: ADD_EXPENSE_GROUP, payload: res.data }))
    .catch((err) => console.log(err));
};

export const deleteExpenseGroup = (listId) => (dispatch) => {
  axios
    .delete("/api/expenses", { data: listId })
    .then((res) => dispatch({ type: DELETE_EXPENSE_GROUP, payload: res.data }))
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
