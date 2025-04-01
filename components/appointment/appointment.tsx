"use client";

import React, { useEffect, useState } from "react";
import styles from "./AppointmentsPage.module.css";
import toast from "react-hot-toast";

interface PatientDetails {
  age: number;
  name: string;
  gender: string;
  address: string;
  contact: number;
}

interface Appointment {
  id: number;
  patient_id: number;
  doctor_id: number;
  appointment_date: string;
  appointment_time: string;
  status: string;
  type: string;
  problem: string;
  patient_details: PatientDetails;
  doctor_specialty: string;
  doctor_name: string;
}

interface ApiResponse {
  success: boolean;
  data: {
    past: Appointment[];
    upcoming: Appointment[];
  };
}

const AppointmentsPage: React.FC = () => {
  const id = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzQzNDgwNjIwLCJleHAiOjE3NDM1NjcwMjB9.ijzl5TU5bipYLZxLzQ6bkc0y7NlDHOTHBpuxljVm0hA"

  const [appointments, setAppointments] = useState<{ past: Appointment[]; upcoming: Appointment[] }>({ past: [], upcoming: [] });
  const [activeTab, setActiveTab] = useState<"past" | "upcoming">("past");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("http://localhost:8000/v1/api/appointments/my-appointments", {
          headers: {
            Authorization: `Bearer ${id}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch appointments.");
        }

        const data: ApiResponse = await response.json();
        setAppointments(data.data);
      } catch (err) {
        setError("Error fetching appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [id]);

  const handleCancel = async (appointmentId: number) => {
    if (!id) return;

    try {
      const response = await fetch(`http://localhost:8000/v1/api/appointments/${appointmentId}/status`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${id}`,
        },
        body: JSON.stringify({ status: "cancelled" }),
      });

      if (!response.ok) {
        throw new Error("Failed to cancel appointment.");
      }

      setAppointments((prev) => ({
        ...prev,
        [activeTab]: prev[activeTab].map((appointment) =>
          appointment.id === appointmentId ? { ...appointment, status: "cancelled" } : appointment
        ),
      }));
      toast.success("Appointment canceled successfully.");
    } catch (err) {
      toast.error("Error canceling appointment.");
    }
  };

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>some error occurred</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>My Appointments</h1>

      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${activeTab === "past" ? styles.active : ""}`}
          onClick={() => setActiveTab("past")}
        >
          Past Appointments
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "upcoming" ? styles.active : ""}`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Appointments
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Specialty</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Problem</th>
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {appointments[activeTab]?.map((appointment) => (
            <tr key={appointment.id}>
              <td>{appointment.doctor_name}</td>
              <td>{appointment.doctor_specialty}</td>
              <td>{new Date(appointment.appointment_date).toLocaleDateString()}</td>
              <td>{appointment.appointment_time}</td>
              <td>{appointment.status}</td>
              <td>{appointment.problem}</td>
              <td>
                <button
                  className={styles.cancelButton}
                  onClick={() => handleCancel(appointment.id)}
                  disabled={appointment.status === "cancelled"}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsPage;
