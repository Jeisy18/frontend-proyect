import { useState, useEffect } from "react";
import { getAllEmployees } from "../../api/employee.api";

export default function StatsEmployeeSelect({ selectedEmployee, setSelectedEmployee }) {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function loadEmployees() {
      try {
        const data = await getAllEmployees();
        setEmployees(data);
      } catch (err) {
        console.error(err);
      }
    }
    loadEmployees();
  }, []);

  return (
    <div style={{ display: "flex", gap: "16px", marginBottom: "24px", marginTop: "24px", flexWrap: "wrap",  width: "200%",  }}>
        <div className="form-group"  style={{ minWidth: "350px"}}>
            <label className="form-label">Seleccionar empleado:</label>
            <select
                className="form-input"
                value={selectedEmployee || ""}
                onChange={(e) => setSelectedEmployee(e.target.value)}
            >
                <option value="">-- Todos --</option>
                {employees.map((emp, index) => (
                <option key={emp.id || index} value={emp.id}>
                    {emp.name} {emp.last_name}
                </option>
                ))}
            </select>
        </div>
    </div>

  );
}
