import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

/* -----------------------------------
   Interactive checklist component
----------------------------------- */
/**
 * PreparationChecklist
 * --------------------
 * Small reusable component for a checklist for a specific appointment.
 * - Stores checked items in localStorage so state persists across refreshes.
 * - Shows encouragement message when all items are checked.
 *
 * Props:
 * - appointmentId: unique ID of the appointment
 */
const PreparationChecklist = ({ appointmentId }) => {
  // Key to store checklist state in localStorage
  const storageKey = `checklist_appointment_${appointmentId}`;

  // Define checklist items
  const checklistItems = [
    { id: "card", label: "Bring hospital card", icon: "🪪" },
    { id: "medicine", label: "Bring medicines", icon: "💊" },
    { id: "toy", label: "Bring favorite toy", icon: "🧸" },
    { id: "water", label: "Drink some water", icon: "💧" },
  ];

  // State to track which items are checked
  const [checkedItems, setCheckedItems] = useState({});

  // Load saved checklist from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setCheckedItems(JSON.parse(saved));
    }
  }, [storageKey]);

  // Toggle a checklist item on/off
  const toggleItem = (id) => {
    const updated = {
      ...checkedItems,
      [id]: !checkedItems[id], // toggle current state
    };

    setCheckedItems(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated)); // persist in localStorage
  };

  return (
    <div className="mt-4 bg-purple-50 rounded-xl p-4">
      <h4 className="font-semibold text-purple-700 mb-3">
        🧠 Prepare for your visit
      </h4>

      {/* Checklist items */}
      <ul className="space-y-2">
        {checklistItems.map((item) => (
          <li
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`flex items-center gap-3 cursor-pointer p-2 rounded-lg transition
              ${
                checkedItems[item.id]
                  ? "bg-purple-200 text-purple-900 line-through" // checked style
                  : "hover:bg-purple-100 text-purple-800" // hover style
              }
            `}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-sm flex-1">{item.label}</span>
            {checkedItems[item.id] && <span>✅</span>}{" "}
            {/* checkmark if selected */}
          </li>
        ))}
      </ul>

      {/* Encouragement message when all items are checked */}
      {Object.values(checkedItems).filter(Boolean).length ===
        checklistItems.length && (
        <p className="mt-3 text-sm text-purple-700 font-medium">
          🌟 Great job! You are all ready!
        </p>
      )}
    </div>
  );
};

/* -----------------------------------
   Appointments page
----------------------------------- */
/**
 * Appointments page
 * -----------------
 * Displays all appointments for the logged-in user.
 * - Fetches appointments from backend API
 * - Shows empty state if no appointments
 * - Each appointment includes:
 *   - Date, department, doctor, location, description
 *   - Interactive checklist for preparation
 */
const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  // Get logged-in user from localStorage
  const storedUser = localStorage.getItem("user");
  const userid = storedUser ? JSON.parse(storedUser).id : null;

  // Fetch appointments from backend on mount or userid change
  useEffect(() => {
    if (!userid) return;

    axios
      .get(`http://localhost:5001/api/appointments/${userid}`)
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error("Appointments error:", err));
  }, [userid]);

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">📅 My Appointments</h2>

        <Link to="/dashboard" className="text-sm text-blue-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>

      {/* Empty state */}
      {appointments.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 shadow text-center">
          <p className="text-xl mb-2">🎈 No appointments yet</p>
          <p className="text-gray-500">
            When you have one, it will appear here!
          </p>
        </div>
      ) : (
        /* Appointments list */
        <div className="grid gap-6 md:grid-cols-2">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="bg-white rounded-2xl p-6 shadow hover:scale-[1.01] transition-transform"
            >
              {/* Top section: department + time */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-700">
                  {appt.department}
                </span>

                <span className="text-sm text-gray-400">
                  🕒 {appt.appointment_time}
                </span>
              </div>

              {/* Main info: date and doctor */}
              <h3 className="text-lg font-bold text-gray-800 mb-1">
                {new Date(appt.appointment_date).toLocaleDateString()}
              </h3>
              <p className="text-gray-600 mb-2">👩‍⚕️ {appt.doctor_name}</p>
              <p className="text-sm text-gray-500 mb-3">📍 {appt.location}</p>

              {/* Optional description */}
              {appt.description && (
                <div className="bg-slate-50 rounded-xl p-3 text-sm text-gray-600 mb-3">
                  💬 {appt.description}
                </div>
              )}

              {/* Interactive preparation checklist */}
              <PreparationChecklist appointmentId={appt.id} />
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Appointments;
