import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";

import { Provider } from "react-redux";
import store from "./store";

import { CssBaseline } from "@material-ui/core";
import ExpensesContainer from "./components/ExpensesContainer";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Income from "./components/Income";

function App() {
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
              <Income />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
