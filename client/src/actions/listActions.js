import axios from "axios";
import {
  GET_LISTS,
  ADD_LIST,
  LOADING_LISTS,
  ADD_CATEGORY,
  ADD_EXPENSE,
  DELETE_LIST,
} from "./types";

export const getLists = () => (dispatch) => {
  dispatch({ type: LOADING_LISTS });
  axios
    .get("/api/lists")
    .then((res) => dispatch({ type: GET_LISTS, payload: res.data }))
    .catch((err) => console.log(err));
};

export const addList = (newList) => (dispatch) => {
  axios
    .post("/api/lists", newList)
    .then((res) => dispatch({ type: ADD_LIST, payload: res.data }))
    .catch((err) => console.log(err));
};

export const deleteList = (listId) => (dispatch) => {
  axios
    .delete("/api/lists", { data: listId })
    .then((res) => dispatch({ type: DELETE_LIST, payload: res.data }))
    .catch((err) => console.log(err));
};

export const addCategory = (item) => (dispatch) => {
  axios
    .post("/api/lists/category", item)
    .then((res) => dispatch({ type: ADD_CATEGORY, payload: res.data }))
    .catch((err) => console.log(err));
};

export const addExpense = (expense) => (dispatch) => {
  axios
    .post("/api/lists/expense", expense)
    .then((res) => dispatch({ type: ADD_EXPENSE, payload: res.data }))
    .catch((err) => console.log(err));
};
