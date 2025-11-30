import React, { useEffect, useState } from "react";
import {getAllEmployees,createEmployee,deleteEmployee,updateEmployee,} from "../api/employee.api";
import NavbarSupervisor from "@/components/NavbarSupervisor";
import styles from "../styles/employees.module.css";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    matricula: "",
    phone: "",
    URL_photo: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function fetchEmployees() {
    try {
      setLoading(true);
      const data = await getAllEmployees();
      setEmployees(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    try {
      if (editingId) {
        await updateEmployee(editingId, formData);
      } else {
        await createEmployee(formData);
      }

      setShowForm(false);
      setEditingId(null);

      setFormData({
        name: "",
        last_name: "",
        matricula: "",
        phone: "",
        URL_photo: "",
      });

      fetchEmployees();
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  function openEdit(emp) {
    setEditingId(emp.id);
    setFormData(emp);
    setShowForm(true);
  }

  async function handleDelete(id) {
    if (!confirm("¿Seguro que deseas eliminar este empleado?")) return;

    try {
      await deleteEmployee(id);
      fetchEmployees();
    } catch (err) {
      alert("Error al eliminar: " + err.message);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.matricula.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <NavbarSupervisor />
      <div className={styles.container}>

        <div className={styles.content}>
          <h1 className={styles.title}>Empleados</h1>

          {/* 🔍 BUSCADOR */}
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Buscar por nombre o matrícula..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* ➕ Agregar */}
          <button className={styles.btnAdd} onClick={() => setShowForm(true)}>
            + Agregar empleado
          </button>

          {/* FORMULARIO */}
          {showForm && (
            <div className={styles.formBox}>
              <h2>{editingId ? "Editar empleado" : "Nuevo empleado"}</h2>

              <div className={styles.formGrid}>
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                />

                <input
                  type="text"
                  name="last_name"
                  placeholder="Apellido"
                  value={formData.last_name}
                  onChange={handleChange}
                  className={styles.input}
                />

                <input
                  type="text"
                  name="matricula"
                  placeholder="Matrícula"
                  value={formData.matricula}
                  onChange={handleChange}
                  className={styles.input}
                />

                <input
                  type="text"
                  name="phone"
                  placeholder="Teléfono"
                  value={formData.phone}
                  onChange={handleChange}
                  className={styles.input}
                />

                <input
                  type="text"
                  name="URL_photo"
                  placeholder="URL Foto"
                  value={formData.URL_photo}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.formButtons}>
                <button className={styles.btnSave} onClick={handleSubmit}>
                  {editingId ? "Actualizar" : "Guardar"}
                </button>

                <button
                  className={styles.btnCancel}
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* TABLA */}
          {!loading && filteredEmployees.length > 0 && (
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr>
                  <th>Matrícula</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Teléfono</th>
                  <th>Foto</th> {/* ← COLUMNA NUEVA */}
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {filteredEmployees.map((emp) => (
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

                    {/* ACCIONES */}
                    <td>
                      <button
                        className={styles.btnEdit}
                        onClick={() => openEdit(emp)}
                      >
                        Editar
                      </button>

                      <button
                        className={styles.btnDelete}
                        onClick={() => handleDelete(emp.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!loading && filteredEmployees.length === 0 && (
            <p className={styles.emptyText}>No hay empleados registrados.</p>
          )}
        </div>
      </div>
    </div>

  );
}
