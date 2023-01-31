import React from 'react';
import './App.css';
import AppointmentsComponent from "./AppointmentsComponent";
import {grommet, Grommet} from "grommet";
import "./index.css"

function App() {
  return (
      <Grommet full theme={grommet}>
        <AppointmentsComponent
            token='bb'
            username='usr0'
        />
      </Grommet>
  );
}

export default App;
