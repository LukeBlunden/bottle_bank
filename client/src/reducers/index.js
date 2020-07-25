import { combineReducers } from "redux";
import expenseReducer from "./expensesReducer";

export default combineReducers({
  expenses: expenseReducer,
});
