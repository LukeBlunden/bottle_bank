import axios from "axios";
import { GET_LISTS, ADD_LIST, LOADING_LISTS, ADD_ITEM } from "./types";

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

export const addItem = (item) => (dispatch) => {
  axios
    .post("/api/lists/list", item)
    .then((res) => dispatch({ type: ADD_ITEM, payload: res.data }))
    .catch((err) => console.log(err));
};
