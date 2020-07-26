import { combineReducers } from "redux";
import expenseReducer from "./expensesReducer";
import incomeReducer from "./incomeReducer";

export default combineReducers({
  expenses: expenseReducer,
  income: incomeReducer,
});
