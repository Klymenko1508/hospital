import React from "react";

const DepartmentCard = ({ name, icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-2xl shadow p-4 flex flex-col items-center hover:scale-105 transition-transform"
    >
      <img
        src={`/assets/images/learn/${icon}`}
        alt={name}
        className="w-24 h-24 mb-2"
      />
      <h3 className="text-lg font-bold text-gray-800">{name}</h3>
    </div>
  );
};

export default DepartmentCard;
