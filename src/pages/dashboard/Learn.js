import React, { useState } from "react";
import departmentsData from "../../data/departments.json";

/**
 * Learn Page
 * -------------
 * Allows users (children or teens) to explore different hospital departments.
 * Features:
 * - Age toggle (children vs teens)
 * - Department selection menu
 * - Display content for the selected department and age group
 */
const Learn = () => {
  // Selected department object
  const [selectedDept, setSelectedDept] = useState(null);

  // Selected age group filter: "children" or "teens"
  const [ageGroup, setAgeGroup] = useState("children");

  return (
    <main className="p-6 min-h-screen bg-slate-100">
      {/* Page title */}
      <h2 className="text-3xl font-bold mb-6 text-center">
        Learn About the Hospital 🏥
      </h2>

      {/* Age group toggle buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-xl ${
            ageGroup === "children" ? "bg-purple-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setAgeGroup("children")}
        >
          Children
        </button>
        <button
          className={`px-4 py-2 rounded-xl ${
            ageGroup === "teens" ? "bg-purple-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setAgeGroup("teens")}
        >
          Teens
        </button>
      </div>

      {/* Departments menu */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {departmentsData.map((dept) => (
          <div
            key={dept.id}
            onClick={() => setSelectedDept(dept)}
            className={`cursor-pointer flex flex-col items-center p-4 rounded-2xl shadow hover:scale-105 transition-transform ${
              selectedDept?.id === dept.id ? "ring-4 ring-purple-400" : ""
            } bg-white`}
          >
            {/* Department icon */}
            <img
              src={dept.icon} // full path from JSON
              alt={dept.name}
              className="w-24 h-24 mb-2 object-contain"
            />
            {/* Department name */}
            <span className="text-center font-semibold">{dept.name}</span>
          </div>
        ))}
      </div>

      {/* Display content for selected department */}
      {selectedDept && (
        <div className="bg-white rounded-2xl p-6 shadow-md">
          {/* Department title */}
          <h3 className="text-2xl font-bold mb-4">{selectedDept.name}</h3>

          {/* Department content items */}
          <div className="space-y-4">
            {selectedDept.content[ageGroup].map((item, idx) => {
              if (item.type === "text") {
                // Render text content
                return (
                  <p key={idx} className="text-gray-700 text-base">
                    {item.text}
                  </p>
                );
              } else if (item.type === "image") {
                // Render image content
                return (
                  <img
                    key={idx}
                    src={item.src} // path from JSON
                    alt="illustration"
                    className="w-full max-w-md mx-auto rounded-lg shadow"
                  />
                );
              } else {
                // Ignore unsupported types
                return null;
              }
            })}
          </div>
        </div>
      )}
    </main>
  );
};

export default Learn;
