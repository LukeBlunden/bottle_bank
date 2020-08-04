import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./App.css";

import { useDispatch, useSelector } from "react-redux";

import { loadUser } from "./actions/authActions";

import ExpensesContainer from "./components/ExpensesContainer";
import Container from "./components/Container";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import IncomeContainer from "./components/IncomeContainer";
import Home from "./components/Home";
import Login from "./components/Login";

import {
  getExpenses,
  addExpenseGroup,
  deleteExpenseGroup,
  addExpenseCategory,
  addExpenseItem,
  addSharedUser,
} from "./actions/expensesActions";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { expenses, loading: expensesLoading } = useSelector(
    (state) => state.expenses
  );

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
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
            {isAuthenticated ? <IncomeContainer /> : <Redirect to="/" />}
          </Route>
          <Route path="/login">
            <Login />
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
    </BrowserRouter>
  );
}

export default App;
