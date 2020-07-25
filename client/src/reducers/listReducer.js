import {
  GET_LISTS,
  ADD_LIST,
  LOADING_LISTS,
  ADD_CATEGORY,
  ADD_EXPENSE,
  DELETE_LIST,
} from "../actions/types";

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
    case ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, action.payload],
      };
    case DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter((list) => list._id !== action.payload._id),
      };
    case ADD_EXPENSE:
    case ADD_CATEGORY:
      const updatedLists = [...state.lists];
      updatedLists.map((list) => {
        if (list._id === action.payload._id) {
          if (list.categories.length !== action.payload.categories.length) {
            list.categories = action.payload.categories;
          }
          if (list.expenseLog.length !== action.payload.expenseLog.length) {
            list.expenseLog = action.payload.expenseLog;
          }
        }
        return list;
      });
      return {
        ...state,
        lists: updatedLists,
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
