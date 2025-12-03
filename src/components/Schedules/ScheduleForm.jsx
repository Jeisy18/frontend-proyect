import React, { useState, useEffect } from "react";
import styles from "../../styles/schedule.module.css";

export default function ScheduleForm({ initial = {}, onSave, onCancel }) {
  const [name, setName] = useState(initial.name || "");
  const [description, setDescription] = useState(initial.description || "");
  const [isActive, setIsActive] = useState(initial.is_active ?? true);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Estados para detalle
  const [addDetail, setAddDetail] = useState(false);
  const [weekDay, setWeekDay] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [lunchStart, setLunchStart] = useState("");
  const [lunchEnd, setLunchEnd] = useState("");

  useEffect(() => {
    if (initial) {
      setName(initial.name || "");
      setDescription(initial.description || "");
      setIsActive(initial.is_active ?? true);
    }
  }, [initial]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("El nombre es obligatorio");
      return;
    }

    if (name.trim().length > 100) {
      setError("El nombre no puede superar 100 caracteres");
      return;
    }

    setSaving(true);
    try {
      // Crear o actualizar solo el horario
      await onSave({
        name: name.trim(),
        description: description.trim(),
        is_active: isActive,
      });

      // Crear detalle solo si está activado
      if (addDetail) {
        await onSave({
          week_day: parseInt(weekDay, 10),
          check_in: checkIn,
          check_out: checkOut,
          lunch_start: lunchStart || null,
          lunch_end: lunchEnd || null,
        });
      }
    } catch (err) {
      setError(err?.message || "Error al guardar.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <h2 className={styles.modalTitle}>
          {initial.id ? "Editar Horario" : "Crear Nuevo Horario"}
        </h2>

        <form onSubmit={handleSubmit} className={styles.formBox}>
          <label>Nombre *</label>
          <input
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label>Descripción</label>
          <textarea
            className={styles.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />

          <label>Estado</label>
          <select
            className={styles.input}
            value={isActive ? "true" : "false"}
            onChange={(e) => setIsActive(e.target.value === "true")}
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={addDetail}
              onChange={(e) => setAddDetail(e.target.checked)}
            />{" "}
            Agregar detalle del horario
          </label>

          {addDetail && (
            <div className={styles.detailBox}>
              <label>Día de la semana</label>
              <select
                className={styles.input}
                value={weekDay}
                onChange={(e) => setWeekDay(e.target.value)}
                required
              >
                <option value="">Selecciona</option>
                <option value="1">Lunes</option>
                <option value="2">Martes</option>
                <option value="3">Miércoles</option>
                <option value="4">Jueves</option>
                <option value="5">Viernes</option>
                <option value="6">Sábado</option>
                <option value="7">Domingo</option>
              </select>

              <label>Entrada</label>
              <input
                type="time"
                className={styles.input}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                required
              />

              <label>Salida</label>
              <input
                type="time"
                className={styles.input}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required
              />

              <label>Inicio comida</label>
              <input
                type="time"
                className={styles.input}
                value={lunchStart}
                onChange={(e) => setLunchStart(e.target.value)}
              />

              <label>Fin comida</label>
              <input
                type="time"
                className={styles.input}
                value={lunchEnd}
                onChange={(e) => setLunchEnd(e.target.value)}
              />
            </div>
          )}

          {error && <p className={styles.errorText}>{error}</p>}

          <div className={styles.formButtons}>
            <button
              type="submit"
              disabled={saving}
              className={styles.btnSave}
            >
              {saving ? "Guardando..." : "Guardar"}
            </button>

            <button
              type="button"
              className={styles.btnCancel}
              onClick={onCancel}
              disabled={saving}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
