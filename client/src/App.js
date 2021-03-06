import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./App.css";
import Theme from "./theme/Theme";

import Container from "./components/Container";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

import { loadUser } from "./actions/authActions";

import {
  getExpenses,
  addExpenseGroup,
  deleteExpenseGroup,
  addExpenseCategory,
  addExpenseItem,
  addSharedUser,
} from "./actions/expensesActions";

import {
  getIncome,
  addIncomeGroup,
  deleteIncomeGroup,
  addIncomeCategory,
  addIncomeItem,
} from "./actions/incomeActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const { expenses, loading: expensesLoading } = useSelector(
    (state) => state.expenses
  );
  const { income, loading: incomeLoading } = useSelector(
    (state) => state.income
  );

  // Get expense and income data
  useEffect(() => {
    if (user) {
      if (income.length === 0 && isLoading === false) {
        dispatch(getIncome(user._id));
      }
      if (expenses.length === 0 && isLoading === false) {
        dispatch(getExpenses(user._id));
      }
    }
  }, [dispatch, income.length, expenses.length, user, isLoading]);

  return (
    <BrowserRouter>
      <Theme>
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/expenses">
              {/* {isAuthenticated ? <ExpensesContainer /> : <Redirect to="/" />} */}
              {isAuthenticated ? (
                <Container
                  data={expenses}
                  loading={expensesLoading}
                  getData={getExpenses}
                  addGroup={addExpenseGroup}
                  deleteGroup={deleteExpenseGroup}
                  addCategory={addExpenseCategory}
                  addItem={addExpenseItem}
                  addUser={addSharedUser}
                />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/income">
              {isAuthenticated ? (
                <Container
                  data={income}
                  loading={incomeLoading}
                  getData={getIncome}
                  addGroup={addIncomeGroup}
                  deleteGroup={deleteIncomeGroup}
                  addCategory={addIncomeCategory}
                  addItem={addIncomeItem}
                  // addUser={addSharedUser}
                />
              ) : (
                <Redirect to="/" />
              )}
              {/* {isAuthenticated ? <IncomeContainer /> : <Redirect to="/" />} */}
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            {/* <Route path="/dashboard">
            {isAuthenticated ? <Dashboard /> : <Redirect to="/" />}
          </Route> */}
            <Route path="/">
              {isAuthenticated ? <Dashboard /> : <Home />}
              {/* <Home /> */}
            </Route>
          </Switch>
        </div>
      </Theme>
    </BrowserRouter>
  );
}

export default App;
