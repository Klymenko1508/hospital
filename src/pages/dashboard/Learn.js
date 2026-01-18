// pages/dashboard/Learn.js
import React, { useState } from "react";
import departmentsData from "../../data/departments.json";

const Learn = () => {
  const [selectedDept, setSelectedDept] = useState(null);
  const [ageGroup, setAgeGroup] = useState("children"); // "children" or "teens"

  return (
    <main className="p-6 min-h-screen bg-slate-100">
      {/* Page Title */}
      <h2 className="text-3xl font-bold mb-6 text-center">
        Learn About the Hospital 🏥
      </h2>

      {/* Age Filter Toggle */}
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

      {/* Departments Menu */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
        {departmentsData.map((dept) => (
          <div
            key={dept.id}
            onClick={() => setSelectedDept(dept)}
            className={`cursor-pointer flex flex-col items-center p-4 rounded-2xl shadow hover:scale-105 transition-transform ${
              selectedDept?.id === dept.id ? "ring-4 ring-purple-400" : ""
            } bg-white`}
          >
            <img
              src={dept.icon} // already full path from JSON
              alt={dept.name}
              className="w-24 h-24 mb-2 object-contain"
            />
            <span className="text-center font-semibold">{dept.name}</span>
          </div>
        ))}
      </div>

      {/* Selected Department Content */}
      {selectedDept && (
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-2xl font-bold mb-4">{selectedDept.name}</h3>

          {/* Content Items */}
          <div className="space-y-4">
            {selectedDept.content[ageGroup].map((item, idx) => {
              if (item.type === "text") {
                return (
                  <p key={idx} className="text-gray-700 text-base">
                    {item.text}
                  </p>
                );
              } else if (item.type === "image") {
                return (
                  <img
                    key={idx}
                    src={item.src} // already correct from JSON
                    alt="illustration"
                    className="w-full max-w-md mx-auto rounded-lg shadow"
                  />
                );
              } else {
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
