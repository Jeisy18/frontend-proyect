import React from "react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Buscar empleado..."
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
