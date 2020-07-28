import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";

import { Provider } from "react-redux";
import store from "./store";
import { useDispatch } from "react-redux";

import { loadUser } from "./actions/authActions";

import { CssBaseline } from "@material-ui/core";
import ExpensesContainer from "./components/ExpensesContainer";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import IncomeContainer from "./components/IncomeContainer";
import Home from "./components/Home";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <CssBaseline />
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/expenses">
              <ExpensesContainer />
            </Route>
            <Route path="/income">
              <IncomeContainer />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
