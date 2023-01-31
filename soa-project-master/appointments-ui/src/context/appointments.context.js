import React, { createContext } from "react";
import useAppointmentsState from "../hooks/useAppointmentsState";

const defaultAppointments = [];

export const AppointmentsContext = createContext();
// provider calls our custom hook to set up the initial object
export function AppointmentsProvider(props) {
  const { appointments, deleteAppointment, toggleAppointment, editAppointment } = useAppointmentsState(
    defaultAppointments
  );
  return (
    //   return a provider wrapper
    <AppointmentsContext.Provider
      value={(appointments, deleteAppointment, toggleAppointment, editAppointment)}
    >
      {props.children}
    </AppointmentsContext.Provider>
  );
}
