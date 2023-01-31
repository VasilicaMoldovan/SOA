import { useState } from "react";

export default initialAppointments => {
  const [appointments, setAppointments] = useState(initialAppointments);
  console.log(`hola`);
  return {
    appointments,
    deleteAppointment: appointmentId => {
      setAppointment(appointments.filter(appointment => appointment.id !== appointmentId));
    },
    toggleAppointment: appointmentId => {
      setAppointments(
        appointments.map(appointment =>
          appointment.id === appointmentId ? { ...appointment, done: !appointment.done } : appointment
        )
      );
    },
    editAppointment: (appointmentId, newAppointmentText) => {
      setAppointments(
        appointments.map(appointment =>
          appointment.id === appointmentId ? { ...appointment, content: newAppointmentText } : appointment
        )
      );
    }
  };
};
