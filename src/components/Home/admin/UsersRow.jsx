import React from "react";

const UsersRow = ({ user }) => {
  return (
    <tr className="table-row">
      <td className="employee-id">{user.id}</td>
      <td>
        <div>
          <span className="employee-name">{user.name}</span>{" "}
          <span className="employee-lastname">{user.last_name}</span>
        </div>
      </td>
      <td className="employee-phone">{user.email}</td>
      <td className="employee-lastname">{user.role === "admin" ? "Administrador" : "Supervisor"}</td>
      <td className="employee-lastname">{user. active ? "Sí" : "No"}</td>
      <td className="employee-actions">
        <button className="action-btn edit-btn">Editar</button>
        <button className="action-btn delete-btn">Eliminar</button>
      </td>
    </tr>
  );
};

export default UsersRow;
