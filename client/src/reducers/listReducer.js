import { GET_LISTS, ADD_LIST, LOADING_LISTS, ADD_ITEM } from "../actions/types";

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
    case ADD_ITEM:
      const updatedLists = [...state.lists];
      console.log(action.payload);
      updatedLists.map((list) => {
        if (list._id === action.payload._id) {
          list.items = action.payload.items;
        }
        return list;
      });
      console.log(updatedLists);
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
