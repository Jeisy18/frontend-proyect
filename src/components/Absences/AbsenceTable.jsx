// src/components/Absence/AbsenceTable.jsx
import React, { useState } from "react";
import styles from "@/styles/absences.module.css";

export default function AbsenceTable({ absences = [], onEdit, onDelete }) {
  const [editingId, setEditingId] = useState(null);

  function handleEdit(abs) {
    setEditingId(abs.id);
    onEdit(abs);
  }

  return (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        <tr>
          <th>ID</th>
          <th>Empleado</th>
          <th>Tipo</th>
          <th>Inicio</th>
          <th>Fin</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {absences.length === 0 ? (
          <tr>
            <td colSpan="7" className={styles.emptyText}>
              No hay ausencias registradas
            </td>
          </tr>
        ) : (
          absences.map((a) => {
            // safe employee name: backend puede devolver employee objeto o solo employeeId
            const employeeName =
              a.employee?.name && a.employee?.last_name
                ? `${a.employee.name} ${a.employee.last_name}`
                : a.employee?.name || a.employeeId || "—";

            // support various date formats
            const start = a.startDate
              ? a.startDate.split("T")[0]
              : a.start_date?.split?.("T")?.[0] || "—";
            const end = a.endDate
              ? a.endDate.split("T")[0]
              : a.end_date?.split?.("T")?.[0] || "—";

            return (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{employeeName}</td>
                <td>{a.type}</td>
                <td>{start}</td>
                <td>{end}</td>
                <td style={{ textTransform: "capitalize" }}>
                  {a.status ? a.status.toLowerCase() : "—"}
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      justifyContent: "center",
                    }}
                  >
                    <button
                      className={styles.btnEdit}
                      onClick={() => handleEdit(a)}
                    >
                      Editar
                    </button>

                    <button
                      className={styles.btnDelete}
                      onClick={() => {
                        if (!confirm("¿Eliminar esta ausencia?")) return;
                        onDelete(a.id);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}
