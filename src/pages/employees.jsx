import React, { useEffect, useState } from "react";
import { getAllEmployees, deleteEmployee } from "../api/employee.api";
import NavbarSupervisor from "../components/NavbarSupervisor";
import EmployeesForm from "../components/Employees/EmployeeForm";
import EmployeesTable from "../components/Employees/EmployeesTable";
import Toast from "../components/Toast";
import ConfirmModal from "../components/ConfirmModal";
import styles from "../styles/employees.module.css";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", last_name: "", matricula: "", phone: "", URL_photo: "" });
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [showToast, setShowToast] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null });

  const showToastMsg = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  async function fetchEmployees() {
    try {
      setLoading(true);
      const data = await getAllEmployees();
      setEmployees(data);
    } catch (err) {
      showToastMsg("Error al cargar empleados: " + err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  function openEdit(emp) {
    setEditingId(emp.id);
    setFormData(emp);
    setShowForm(true);
  }

  function handleDelete(id) {
    setConfirmDelete({ show: true, id });
  }

  async function confirmDeleteAction() {
    try {
      await deleteEmployee(confirmDelete.id);
      showToastMsg("Empleado eliminado correctamente", "success");
      fetchEmployees();
    } catch (err) {
      showToastMsg("Error al eliminar: " + err.message, "error");
    } finally {
      setConfirmDelete({ show: false, id: null });
    }
  }

  const filteredEmployees = employees.filter(
    e => e.name.toLowerCase().includes(search.toLowerCase()) || e.matricula.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <NavbarSupervisor />
      <div className={styles.container}>
        <div className="contentContainer">
          <h1 className={styles.title}>Empleados</h1>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Buscar por nombre o matrícula..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className={styles.btnAdd} onClick={() => setShowForm(true)}>+ Agregar empleado</button>

          {showForm && (
            <EmployeesForm
              formData={formData}
              setFormData={setFormData}
              editingId={editingId}
              cancel={() => {
                setShowForm(false);
                setEditingId(null);
                setFormData({ name: "", last_name: "", matricula: "", phone: "", URL_photo: "", photoFile: null });
              }}
              showToastMsg={showToastMsg}
              fetchEmployees={fetchEmployees} 
            />
          )}

          {!loading && filteredEmployees.length > 0 && (
            <EmployeesTable employees={filteredEmployees} openEdit={openEdit} handleDelete={handleDelete} />
          )}

          {!loading && filteredEmployees.length === 0 && (
            <p className={styles.emptyText}>No hay empleados registrados.</p>
          )}
        </div>
      </div>

      {confirmDelete.show && (
        <ConfirmModal
          message="¿Seguro que deseas eliminar este empleado?"
          onConfirm={confirmDeleteAction}
          onCancel={() => setConfirmDelete({ show: false, id: null })}
        />
      )}

      {showToast && (
        <Toast message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
}
