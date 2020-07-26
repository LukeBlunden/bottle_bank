import axios from "axios";
import {
  GET_INCOME,
  LOADING_INCOME,
  ADD_INCOME_GROUP,
  DELETE_INCOME_GROUP,
  ADD_INCOME_CATEGORY,
  ADD_INCOME_ITEM,
} from "./types";

export const getIncome = () => (dispatch) => {
  dispatch({ type: LOADING_INCOME });
  axios
    .get("/api/income")
    .then((res) => dispatch({ type: GET_INCOME, payload: res.data }))
    .catch((err) => console.log(err));
};

export const addIncomeGroup = (newIncome) => (dispatch) => {
  axios
    .post("/api/income", newIncome)
    .then((res) => dispatch({ type: ADD_INCOME_GROUP, payload: res.data }))
    .catch((err) => console.log(err));
};

export const deleteIncomeGroup = (listId) => (dispatch) => {
  axios
    .delete("/api/income", { data: listId })
    .then((res) => dispatch({ type: DELETE_INCOME_GROUP, payload: res.data }))
    .catch((err) => console.log(err));
};

export const addIncomeCategory = (item) => (dispatch) => {
  axios
    .post("/api/income/category", item)
    .then((res) => dispatch({ type: ADD_INCOME_CATEGORY, payload: res.data }))
    .catch((err) => console.log(err));
};

export const addIncomeItem = (income) => (dispatch) => {
  axios
    .post("/api/income/item", income)
    .then((res) => dispatch({ type: ADD_INCOME_ITEM, payload: res.data }))
    .catch((err) => console.log(err));
};
