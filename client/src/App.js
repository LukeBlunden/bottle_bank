import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./App.css";

import { useDispatch, useSelector } from "react-redux";

import { loadUser } from "./actions/authActions";

import ExpensesContainer from "./components/ExpensesContainer";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import IncomeContainer from "./components/IncomeContainer";
import Home from "./components/Home";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/expenses">
            {isAuthenticated ? <ExpensesContainer /> : <Redirect to="/" />}
          </Route>
          <Route path="/income">
            {isAuthenticated ? <IncomeContainer /> : <Redirect to="/" />}
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
