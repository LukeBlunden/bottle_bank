import { combineReducers } from "redux";
import expenseReducer from "./expensesReducer";
import incomeReducer from "./incomeReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  expenses: expenseReducer,
  income: incomeReducer,
  error: errorReducer,
  auth: authReducer,
});
