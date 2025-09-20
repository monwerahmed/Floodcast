import React from "react";

const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6 text-center">
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
};

export default StatsCard;
