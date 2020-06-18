import { GET_LISTS, LOADING_LISTS } from "../actions/types";

const initialState = {
  lists: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LISTS:
      return {
        ...state,
        lists: action.payload,
        loading: false,
      };
    case LOADING_LISTS:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
