import {
  GET_INCOME,
  LOADING_INCOME,
  ADD_INCOME_GROUP,
  DELETE_INCOME_GROUP,
  ADD_INCOME_CATEGORY,
  ADD_INCOME_ITEM,
} from "../actions/types";

const initialState = {
  income: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_INCOME:
      return {
        ...state,
        income: action.payload,
        loading: false,
      };
    case ADD_INCOME_GROUP:
      return {
        ...state,
        income: [...state.income, action.payload],
      };
    case DELETE_INCOME_GROUP:
      return {
        ...state,
        income: state.income.filter(
          (group) => group._id !== action.payload._id
        ),
      };
    case ADD_INCOME_CATEGORY:
    case ADD_INCOME_ITEM:
      const updatedIncome = [...state.income];
      updatedIncome.map((income) => {
        if (income._id === action.payload._id) {
          if (income.categories.length !== action.payload.categories.length) {
            income.categories = action.payload.categories;
          }
          if (income.log.length !== action.payload.log.length) {
            income.log = action.payload.log;
          }
        }
        return income;
      });
      return {
        ...state,
        income: updatedIncome,
      };
    case LOADING_INCOME:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
