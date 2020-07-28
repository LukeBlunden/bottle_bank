import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./App.css";

import { Provider } from "react-redux";
import store from "./store";
import { useDispatch, useSelector } from "react-redux";

import { loadUser } from "./actions/authActions";

import { CssBaseline } from "@material-ui/core";
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
  }, []);

  return (
    // <Provider store={store}>
    <BrowserRouter>
      <CssBaseline />
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/expenses">
            {isAuthenticated ? <ExpensesContainer /> : <Redirect to="/" />}
          </Route>
          <Route path="/income">
            {isAuthenticated ? <IncomeContainer /> : <Redirect to="/" />}
          </Route>
          <Route path="/dashboard">
            {isAuthenticated ? <Dashboard /> : <Redirect to="/" />}
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
    // </Provider>
  );
}

export default App;
