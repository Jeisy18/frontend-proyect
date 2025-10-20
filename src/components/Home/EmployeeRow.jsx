import React from "react";

const EmployeeRow = ({ employee }) => {
  return (
    <tr className="table-row">
      <td className="employee-id">{employee.id}</td>
      <td className="employee-photo">
        <div className="photo-wrapper">
          <img
            src={employee.photo}
            alt={`${employee.name} ${employee.lastname}`}
          />
        </div>
      </td>
      <td>
        <div>
          <span className="employee-name">{employee.name}</span>{" "}
          <span className="employee-lastname">{employee.lastname}</span>
        </div>
      </td>
      <td className="employee-phone">{employee.phone}</td>
      <td className="employee-actions">
        <button className="action-btn edit-btn">Editar</button>
        <button className="action-btn delete-btn">Eliminar</button>
      </td>
    </tr>
  );
};

export default EmployeeRow;
