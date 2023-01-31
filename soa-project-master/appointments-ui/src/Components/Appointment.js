import React from "react";
import EditAppointmentForm from "./EditAppointmentForm";
import useToggleState from "../hooks/useToggleState";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Star, StarBorder } from "@material-ui/icons";

export default function Appointment({
  content,
  done,
  id,
  toggleAppointment,
  deleteAppointment,
  editAppointment
}) {
  const [isEditing, toggleIsEditing] = useToggleState(false);

  return (
    <ListItem style={{ height: "64px" }}>
      {isEditing ? (
        <EditAppointmentForm
          content={content}
          editAppointment={editAppointment}
          id={id}
          toggleIsEditing={toggleIsEditing}
        />
      ) : (
        <>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<StarBorder />}
                  checkedIcon={<Star />}
                  checked={done}
                  onClick={() => toggleAppointment(id)}
                />
              }
            />
          </FormGroup>
          <ListItemText style={{ textDecoration: done && "underline red" }}>
            {content}
          </ListItemText>
          <ListItemSecondaryAction>
            <IconButton aria-label="edit" onClick={() => toggleIsEditing()}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => deleteAppointment(id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </>
      )}
    </ListItem>
  );
}
