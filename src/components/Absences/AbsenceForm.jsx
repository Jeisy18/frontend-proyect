import React, { useState, useEffect } from "react";
import StatsEmployeeSelect from "@/components/Stats/StatsEmployeeSelect";
import styles from "@/styles/absences.module.css";

export default function AbsenceForm({
  initialData = null,
  onCancel,
  onSaved,
  createAbsence,
  updateAbsence,
}) {
  const [formData, setFormData] = useState({
    employeeId: "",
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        employeeId: initialData.employeeId,
        type: initialData.type,
        startDate: initialData.startDate.split("T")[0],
        endDate: initialData.endDate.split("T")[0],
        reason: initialData.reason,
      });
    }
  }, [initialData]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.employeeId) return alert("Selecciona un empleado");

    if (initialData) {
      await updateAbsence(initialData.id, formData);
    } else {
      await createAbsence(formData);
    }

    onSaved();
  }

  return (
    <div>
      <h2 className={styles.modalTitle}>
        {initialData ? "Editar Ausencia" : "Nueva Ausencia"}
      </h2>

      <StatsEmployeeSelect
        selectedEmployee={formData.employeeId}
        setSelectedEmployee={
          initialData
            ? () => {}
            : (id) => setFormData({ ...formData, employeeId: id })
        }
        disabled={!!initialData}
      />

      <form onSubmit={handleSubmit} className={styles.formGrid}>
        <input
          className={styles.input}
          type="text"
          name="type"
          placeholder="Tipo"
          value={formData.type}
          onChange={handleChange}
        />

        <input
          className={styles.input}
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />

        <input
          className={styles.input}
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />

        <input
          className={`${styles.input} ${styles.reasonBig}`}
          type="text"
          name="reason"
          placeholder="Motivo"
          value={formData.reason}
          onChange={handleChange}
        />

        <div className={styles.modalButtons}>
          <button className={styles.btnSave}>
            {initialData ? "Actualizar" : "Guardar"}
          </button>

          <button type="button" className={styles.btnCancel} onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
