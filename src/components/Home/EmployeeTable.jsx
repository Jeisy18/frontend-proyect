import React, { useState } from "react";
import EmployeeRow from "./EmployeeRow";
import SearchBar from "./SearchBar";
import FilterToggle from "./FilterToggle";

const EmployeeTable = ({ employees = [] }) => {  
  const [search, setSearch] = useState("");
  const [activeOnly, setActiveOnly] = useState(false);
  

  const filteredEmployees = (employees || []).filter(emp => {
    const matchesSearch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.lastname.toLowerCase().includes(search.toLowerCase());
    const matchesActive = activeOnly ? emp.active : true;
    return matchesSearch && matchesActive;
  });

  return (

    
    <div className="content-wrapper">
      <div className="header-decoration"></div>

      <div className="controls-section">
        <SearchBar value={search} onChange={e => setSearch(e.target.value)} />
        <FilterToggle
          checked={activeOnly}
          onChange={e => setActiveOnly(e.target.checked)}
          label="Activo"
        />
      </div>

      <table className="employee-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map(emp => (
            <EmployeeRow key={emp.id} employee={emp} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
