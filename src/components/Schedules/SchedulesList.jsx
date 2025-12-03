import React from "react";
import styles from "../../styles/schedule.module.css";

export default function SchedulesList({ schedules = [], onDelete, onEdit, onViewDetails }) {
  if (!schedules || schedules.length === 0) {
    return <p className={styles.emptyText}>No hay horarios registrados.</p>;
  }

  return (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        <tr>
          <th>Horario</th>
          <th>Descripción</th>
          <th>Activo</th>
          <th>Creado</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {schedules.map((sch) => {
          const realId = sch.id ?? sch.schedule_set_id ?? sch.id_schedule_set ?? null;

          return (
            <tr key={realId}>
              <td>{sch.name}</td>
              <td>{sch.description || "—"}</td>
              <td>{sch.is_active ? "Sí" : "No"}</td>
              <td>{sch.created_at ? new Date(sch.created_at).toLocaleDateString() : "—"}</td>

              <td className={styles.actionButtons}>
                <button
                  className={styles.btnDetails}
                  onClick={() => onViewDetails && onViewDetails(realId)}
                >
                  Ver detalles
                </button>

                <button
                  className={styles.btnEdit}
                  onClick={() => onEdit && onEdit(sch)}
                >
                  Editar
                </button>

                <button
                  className={styles.btnDelete}
                  onClick={() => onDelete && onDelete(realId)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
