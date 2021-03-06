import axios from "axios";
import {
  GET_INCOME,
  LOADING_INCOME,
  ADD_INCOME_GROUP,
  DELETE_INCOME_GROUP,
  ADD_INCOME_CATEGORY,
  ADD_INCOME_ITEM,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getIncome = (id) => (dispatch, getState) => {
  dispatch({ type: LOADING_INCOME });
  axios
    .get(`/api/income/${id}`, tokenConfig(getState))
    .then((res) => dispatch({ type: GET_INCOME, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addIncomeGroup = (newIncome, user) => (dispatch, getState) => {
  axios
    .post("/api/income", { newIncome, user }, tokenConfig(getState))
    .then((res) => dispatch({ type: ADD_INCOME_GROUP, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteIncomeGroup = (listId) => (dispatch, getState) => {
  axios
    .delete(`/api/income/${listId}`, tokenConfig(getState))
    .then((res) => dispatch({ type: DELETE_INCOME_GROUP, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addIncomeCategory = (item) => (dispatch, getState) => {
  axios
    .post("/api/income/category", item, tokenConfig(getState))
    .then((res) => dispatch({ type: ADD_INCOME_CATEGORY, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addIncomeItem = (income) => (dispatch, getState) => {
  axios
    .post("/api/income/item", income, tokenConfig(getState))
    .then((res) => dispatch({ type: ADD_INCOME_ITEM, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
