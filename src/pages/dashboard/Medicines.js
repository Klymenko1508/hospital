import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

/**
 * Medicines Page
 * -------------------
 * Shows the list of medicines prescribed to the user.
 * Features:
 * - Fetch medicines from backend API
 * - Display medicine name, dosage, time, and doctor
 * - Mark medicine as taken
 * - Show empty state when no medicines exist
 */
const Medicines = () => {
  // Medicines array fetched from backend
  const [medicines, setMedicines] = useState([]);

  // Get current user's ID from localStorage
  const storedUser = localStorage.getItem("user");
  const userid = storedUser ? JSON.parse(storedUser).id : null;

  // Fetch medicines for the user when component mounts or userid changes
  useEffect(() => {
    if (!userid) return;

    axios
      .get(`http://localhost:5001/api/medicines/${userid}`)
      .then((res) => setMedicines(res.data))
      .catch((err) => console.error(err));
  }, [userid]);

  /**
   * Mark a medicine as taken
   * Sends a PUT request to backend and updates state locally
   * @param {number} id - medicine ID
   */
  const markAsTaken = (id) => {
    axios
      .put(`http://localhost:5001/api/medicines/${id}/take`)
      .then(() => {
        // Update the medicine in local state to reflect it as taken
        setMedicines((prev) =>
          prev.map((m) => (m.id === id ? { ...m, is_taken: 1 } : m))
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <main className="min-h-screen bg-slate-100 p-4 md:p-8">
      {/* Page header with title and back link */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">💊 My Medicines</h2>
        <Link to="/dashboard" className="text-sm text-blue-600 hover:underline">
          ← Back to Dashboard
        </Link>
      </div>

      {/* Empty state if no medicines are prescribed */}
      {medicines.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 shadow text-center">
          <p className="text-xl mb-2">🎈 No medicines prescribed yet</p>
          <p className="text-gray-500">
            When your doctor prescribes one, it will appear here!
          </p>
        </div>
      ) : (
        /* Display medicines in a responsive grid */
        <div className="grid gap-6 md:grid-cols-2">
          {medicines.map((m) => (
            <div
              key={m.id}
              className={`bg-white rounded-2xl p-6 shadow hover:scale-[1.01] transition-transform ${
                m.is_taken ? "opacity-50" : "" // Reduce opacity if already taken
              }`}
            >
              {/* Top row: medicine name and time */}
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-green-700">{m.name}</span>
                <span className="text-sm text-gray-500">{m.time}</span>
              </div>

              {/* Dosage and doctor info */}
              <p className="text-sm text-gray-600">💉 {m.dosage}</p>
              <p className="text-xs text-gray-500 mb-2">👩‍⚕️ {m.doctor_name}</p>

              {/* Button to mark medicine as taken */}
              <button
                disabled={m.is_taken} // Disable if already taken
                onClick={() => markAsTaken(m.id)}
                className={`px-4 py-2 rounded-full text-white font-semibold text-sm ${
                  m.is_taken
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {m.is_taken ? "Taken ✅" : "Mark as Taken"}
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Medicines;
