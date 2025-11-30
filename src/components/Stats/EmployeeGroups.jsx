import { useState } from "react";

export default function EmployeeGroups({ groups }) {
  if (!groups) return null;

  const sections = [
    { key: "punctual", label: "Puntuales", color: "#4caf50" },
    { key: "early", label: "Tempraneros", color: "#2196f3" },
    { key: "late", label: "Retardistas", color: "#ff9800" },
    { key: "absent", label: "Faltantes", color: "#f44336" },
  ];

  const [activeSection, setActiveSection] = useState("punctual");

  const activeInfo = sections.find((s) => s.key === activeSection);
  const activeList = groups[activeSection] || [];

  return (
    <div className="employeeGroupsContainer">
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Clasificación de empleados
      </h2>

      {/* Tabs minimalistas */}
      <div className="employeeTabs">
        {sections.map((s) => (
          <button
            key={s.key}
            className={`employeeTabButton ${
              activeSection === s.key ? "active" : ""
            }`}
            onClick={() => setActiveSection(s.key)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Tarjetas coloreadas */}
      <div className="employeeGroupGrid" style={{ marginTop: "25px" }}>
        {activeList.length > 0 ? (
          activeList.map((emp) => (
            <div
              key={emp.employeeId}
              className="employeePhotoCard coloredCard"
              style={{
                borderColor: activeInfo.color, 
              }}
            >
              <img
                src={emp.employeePhoto || "/default-avatar.png"}
                alt="Foto empleado"
                className="employeePhotoAvatar"
              />

              <div className="employeePhotoName">
                {emp.employeeName || "Empleado"}
              </div>

              <div className="employeePhotoTotal">
                Registros: {emp.total}
              </div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>
            No hay empleados en esta categoría
          </p>
        )}
      </div>
    </div>
  );
}
