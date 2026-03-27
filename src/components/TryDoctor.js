import React, { useState } from "react";

/**
 * Tools available for the "Try Being the Doctor" activity
 * Each tool has an id, label, and emoji for display
 */
const tools = [
  { id: "stethoscope", label: "Stethoscope", emoji: "🩺" },
  { id: "thermometer", label: "Thermometer", emoji: "🌡️" },
  { id: "bandage", label: "Bandage", emoji: "🩹" },
  { id: "medicine", label: "Medicine", emoji: "💊" },
];

/**
 * Patients available in the activity
 * Each patient has an id, name, and image
 */
const patients = [
  { id: 1, name: "Charlie", image: "/assets/images/patient1.png" },
  { id: 2, name: "Mia", image: "/assets/images/patient2.png" },
];

/**
 * TryDoctor component
 * -------------------
 * Simulates a simple doctor activity:
 * - Select a patient
 * - Select a tool
 * - Apply the tool and show fun feedback
 *
 * State:
 * - selectedPatient: currently chosen patient
 * - selectedTool: currently chosen tool
 * - message: feedback message displayed after applying a tool
 */
const TryDoctor = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedTool, setSelectedTool] = useState(null);
  const [message, setMessage] = useState("");

  /**
   * handleApplyTool
   * ----------------
   * Called when the "Apply Tool" button is clicked
   * - Checks if both a patient and a tool are selected
   * - Displays a fun message
   * - Resets message after 2 seconds
   */
  const handleApplyTool = () => {
    if (!selectedPatient || !selectedTool) {
      setMessage("Choose a patient and a tool first!");
      return;
    }

    // Fun feedback
    setMessage(
      `${selectedPatient.name} is feeling better thanks to your ${selectedTool.label}! 🎉`
    );

    // Optionally reset the message after 2 seconds
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md max-w-xl mx-auto">
      {/* Component title */}
      <h3 className="text-2xl font-bold mb-4 text-center">
        Try Being the Doctor 🩺
      </h3>

      {/* -------------------------
          Patient selection section
          -------------------------
          - Maps over patients array
          - Highlights the selected patient
      */}
      <div className="flex justify-center gap-4 mb-6">
        {patients.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPatient(p)}
            className={`border-4 rounded-xl p-2 transition-all ${
              selectedPatient?.id === p.id
                ? "border-blue-500 scale-105" // Highlight selected
                : "border-transparent"
            }`}
          >
            <img
              src={p.image}
              alt={p.name}
              className="w-20 h-20 object-contain"
            />
            <p className="text-sm mt-1">{p.name}</p>
          </button>
        ))}
      </div>

      {/* -------------------------
          Tool selection section
          -------------------------
          - Maps over tools array
          - Highlights selected tool
      */}
      <div className="flex justify-center gap-4 mb-6">
        {tools.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedTool(t)}
            className={`border-2 rounded-xl px-3 py-2 text-xl transition-all ${
              selectedTool?.id === t.id
                ? "border-green-500 bg-green-100 scale-105" // Highlight selected
                : "border-gray-200"
            }`}
          >
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      {/* -------------------------
          Apply Tool button
          -------------------------
          - Calls handleApplyTool
      */}
      <div className="flex justify-center mb-4">
        <button
          onClick={handleApplyTool}
          className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-xl hover:bg-blue-600 transition"
        >
          Apply Tool
        </button>
      </div>

      {/* -------------------------
          Feedback message
          -------------------------
          - Shows the message after applying a tool
      */}
      {message && (
        <p className="text-center text-green-600 font-medium">{message}</p>
      )}
    </div>
  );
};

export default TryDoctor;
