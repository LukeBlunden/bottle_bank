import React from "react";

import "./App.css";

import { Provider } from "react-redux";
import store from "./store";

import { CssBaseline } from "@material-ui/core";
import FormModal from "./components/modals/FormModal";
import ListContainer from "./components/ListsContainer";
import Navbar from "./components/Navbar";

function App() {
  // const [open, setOpen] = useState(false);

  return (
    <Provider store={store}>
      <React.Fragment>
        <CssBaseline />
        <div className="App">
          <Navbar />
          <FormModal />
          <ListContainer />
        </div>
      </React.Fragment>
    </Provider>
  );
}

export default App;
