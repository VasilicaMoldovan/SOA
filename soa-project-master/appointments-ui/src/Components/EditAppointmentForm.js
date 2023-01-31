import React from "react";
import useInputState from "../hooks/useInputState";
import TextField from "@material-ui/core/TextField";

export default function EditAppointmentForm({
  content,
  id,
  editAppointment,
  toggleIsEditing
}) {
  const [value, handleChange, reset] = useInputState(content);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        editAppointment(id, value);
        reset();
        toggleIsEditing();
      }}
      style={{ marginLeft: "3rem", width: "80%" }}
    >
      <TextField
        value={value}
        onChange={handleChange}
        margin="normal"
        fullWidth
        autoFocus
      />
    </form>
  );
}
