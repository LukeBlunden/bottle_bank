import React, { useState } from "react";
import "./App.css";
import { Button, CssBaseline } from "@material-ui/core";
import FormModal from "./components/modals/FormModal";
import ListContainer from "./components/ListsContainer";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <CssBaseline />
      <div className="App">
        <h1>Bottle bank</h1>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpen(true)}
        >
          Add list
        </Button>
        <FormModal open={open} closeHandler={() => setOpen(false)} />
        <ListContainer />
      </div>
    </React.Fragment>
  );
}

export default App;
