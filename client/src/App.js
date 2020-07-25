import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";

import { Provider } from "react-redux";
import store from "./store";

import { CssBaseline } from "@material-ui/core";
import ListContainer from "./components/ListsContainer";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CssBaseline />
        <div className="App">
          <Navbar />
          <Switch>
            <Route path="/expenses">
              <ListContainer />
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
