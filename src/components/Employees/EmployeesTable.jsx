import React from "react";
import styles from "../../styles/employees.module.css";

export default function EmployeesTable({ employees, openEdit, handleDelete }) {
  return (
    <table className={styles.table}>
      <thead className={styles.tableHead}>
        <tr>
          <th>Matrícula</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Teléfono</th>
          <th>Foto</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id} className={styles.tableRow}>
            <td>{emp.matricula}</td>
            <td>{emp.name}</td>
            <td>{emp.last_name}</td>
            <td>{emp.phone}</td>

            <td>
              <img
                src={emp.URL_photo}
                alt={`${emp.name} ${emp.last_name}`}
                className={styles.photo}
              />
            </td>

            <td>
              <button className={styles.btnEdit} onClick={() => openEdit(emp)}>
                Editar
              </button>

              <button className={styles.btnDelete} onClick={() => handleDelete(emp.id)}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
