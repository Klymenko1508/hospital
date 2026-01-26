import React from "react";

/**
 * DepartmentCard component
 * ------------------------
 * Represents a single department or activity as a clickable card.
 * Typically used in a list or grid of departments on a dashboard.
 *
 * Props:
 * - name: string – the name of the department (e.g., "X-ray")
 * - icon: string – the filename of the icon image
 * - onClick: function – callback triggered when the card is clicked
 */
const DepartmentCard = ({ name, icon, onClick }) => {
  return (
    // Clickable card container
    // Hover effect: slightly scales up the card
    <div
      onClick={onClick} // Trigger parent-provided callback on click
      className="cursor-pointer bg-white rounded-2xl shadow p-4 flex flex-col items-center hover:scale-105 transition-transform"
    >
      {/* Department icon */}
      {/* Icon path dynamically constructed from props */}
      <img
        src={`/assets/images/learn/${icon}`}
        alt={name} // Accessibility: use department name as alt text
        className="w-24 h-24 mb-2"
      />

      {/* Department name */}
      <h3 className="text-lg font-bold text-gray-800">{name}</h3>
    </div>
  );
};

export default DepartmentCard;
