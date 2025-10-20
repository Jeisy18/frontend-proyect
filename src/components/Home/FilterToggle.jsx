import React from "react";

const FilterToggle = ({ checked, onChange, label }) => {
  return (
    <div className="filter-container">
      <label className="filter-toggle">
        <input
          type="checkbox"
          className="filter-checkbox"
          checked={checked}
          onChange={onChange}
        />
        <span className="filter-slider"></span>
        <span className="filter-label">{label}</span>
      </label>
    </div>
  );
};

export default FilterToggle;