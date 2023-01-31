import React from "react";
import useInputState from "../hooks/useInputState";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

export default function AppointmentForm({ addAppointment }) {
  const [value, handleChange, reset] = useInputState("");

  return (
    <Paper style={{ margin: "1rem 0", padding: "0 1rem" }}>
      <form
        onSubmit={event => {
          // prevent the default request to refresh the page
          event.preventDefault();
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();

          today = dd + '.' + mm + '.' + yyyy;
          console.log(`today ${today}`);
          console.log(`value ${value}`);
          const newVal = today + ' - ' + value;
          console.log(`new ${newVal}`);
          //value = today + ' - ';

          addAppointment(newVal);
          reset();
        }}
      >
        <TextField
          value={value}
          onChange={handleChange}
          margin="normal"
          label="What do you want to add?"
          fullWidth
        />
      </form>
    </Paper>
  );
}
