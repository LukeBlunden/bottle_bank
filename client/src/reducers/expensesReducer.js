import {
  GET_EXPENSES,
  ADD_EXPENSE_GROUP,
  LOADING_EXPENSES,
  ADD_EXPENSE_CATEGORY,
  ADD_EXPENSE_ITEM,
  DELETE_EXPENSE_GROUP,
} from "../actions/types";

const initialState = {
  expenses: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_EXPENSES:
      return {
        ...state,
        expenses: action.payload,
        loading: false,
      };
    case ADD_EXPENSE_GROUP:
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };
    case DELETE_EXPENSE_GROUP:
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense._id !== action.payload._id
        ),
      };
    case ADD_EXPENSE_ITEM:
    case ADD_EXPENSE_CATEGORY:
      const updatedExpenses = [...state.expenses];
      updatedExpenses.map((expense) => {
        if (expense._id === action.payload._id) {
          if (expense.categories.length !== action.payload.categories.length) {
            expense.categories = action.payload.categories;
          }
          if (expense.log.length !== action.payload.log.length) {
            expense.log = action.payload.log;
          }
        }
        return expense;
      });
      return {
        ...state,
        expenses: updatedExpenses,
      };
    case LOADING_EXPENSES:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
