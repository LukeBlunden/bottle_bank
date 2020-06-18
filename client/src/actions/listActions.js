import axios from "axios";
import { GET_LISTS, LOADING_LISTS } from "./types";

export const getLists = () => (dispatch) => {
  dispatch({ type: LOADING_LISTS });
  axios
    .get("/api/lists")
    .then((res) => dispatch({ type: GET_LISTS, payload: res.data }))
    .catch((err) => console.log(err));
};
