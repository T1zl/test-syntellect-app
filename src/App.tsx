import React from "react";
import "./App.css";
import ControlWithButtons from "./components/ControlWithButtons";
import ControlAutocomplete from "./components/ControlAutocomplete";

function App() {
  return (
      <div className={'app'}>
        <ControlWithButtons />

        <ControlAutocomplete />
      </div>
  );
}

export default App;