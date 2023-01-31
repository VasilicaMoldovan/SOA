import React from "react";
import Appointment from "./Appointment";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

export default function AppointmentList({ appointments, toggleAppointment, deleteAppointment, editAppointment }) {
  return (
    <Paper>
      <List>
        {appointments.map((appointment, index) => (
          <div key={appointment.id}>
            <Appointment
              {...appointment}
              toggleAppointment={toggleAppointment}
              deleteAppointment={deleteAppointment}
              editAppointment={editAppointment}
            />
            {index < appointments.length - 1 && <Divider />}
          </div>
        ))}
      </List>
    </Paper>
  );
}
