import axios from "axios";
import {
  GET_EXPENSES,
  ADD_EXPENSE_GROUP,
  LOADING_EXPENSES,
  ADD_EXPENSE_CATEGORY,
  ADD_EXPENSE_ITEM,
  DELETE_EXPENSE_GROUP,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getExpenses = (id) => (dispatch, getState) => {
  dispatch({ type: LOADING_EXPENSES });
  axios
    .get(`/api/expenses/${id}`, tokenConfig(getState))
    .then((res) => dispatch({ type: GET_EXPENSES, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addExpenseGroup = (newExpense, id) => (dispatch, getState) => {
  axios
    .post("/api/expenses", { newExpense, id }, tokenConfig(getState))
    .then((res) => dispatch({ type: ADD_EXPENSE_GROUP, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteExpenseGroup = (listId) => (dispatch, getState) => {
  axios
    .delete("/api/expenses", { data: listId }, tokenConfig(getState))
    .then((res) => dispatch({ type: DELETE_EXPENSE_GROUP, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addExpenseCategory = (item) => (dispatch, getState) => {
  axios
    .post("/api/expenses/category", item, tokenConfig(getState))
    .then((res) => dispatch({ type: ADD_EXPENSE_CATEGORY, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addExpenseItem = (expense) => (dispatch, getState) => {
  axios
    .post("/api/expenses/item", expense, tokenConfig(getState))
    .then((res) => dispatch({ type: ADD_EXPENSE_ITEM, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
