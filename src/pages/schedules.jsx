import { useEffect, useState } from "react";
import Navbar from "../components/NavbarSupervisor";
import SchedulesList from "../components/Schedules/SchedulesList";
import styles from "../styles/schedule.module.css";

import {
  getAllScheduleSets,
  createScheduleSet,
  deleteScheduleSet,
} from "@/api/schedule.api";

import {
  createScheduleDetail,
  getScheduleDetails,
} from "@/api/schedule-detail.api";

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
  const [selectedScheduleDetails, setSelectedScheduleDetails] = useState([]);

 
  const [addingDetailsInline, setAddingDetailsInline] = useState(false);


  const [weekDay, setWeekDay] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [lunchStart, setLunchStart] = useState("");
  const [lunchEnd, setLunchEnd] = useState("");

  useEffect(() => {
    loadSchedules();
  }, []);

  async function loadSchedules() {
    setLoading(true);
    try {
      const data = await getAllScheduleSets();
      const fixed = data.map((s) => ({
        ...s,
        id: s.id ?? s.schedule_set_id ?? s.id_schedule_set,
      }));
      setSchedules(fixed || []);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(payload) {
   
    const createdSchedule = await createScheduleSet(payload);

    if (addingDetailsInline) {
      
      try {
        await createScheduleDetail(createdSchedule.id, {
          week_day: parseInt(weekDay, 10),
          check_in: checkIn,
          check_out: checkOut,
          lunch_start: lunchStart || null,
          lunch_end: lunchEnd || null,
        });
      } catch (error) {
        alert("Error al crear detalle inline: " + error.message);
      }
    }

   
    setShowForm(false);
    setAddingDetailsInline(false);
    setWeekDay("");
    setCheckIn("");
    setCheckOut("");
    setLunchStart("");
    setLunchEnd("");
    await loadSchedules();
  }

  async function handleDelete(id) {
    if (!confirm("¿Seguro que deseas eliminar este horario?")) return;
    await deleteScheduleSet(id);
    await loadSchedules();
  }

  async function handleOpenDetails(scheduleId) {
    setSelectedScheduleId(scheduleId);
    try {
      const details = await getScheduleDetails(scheduleId);
      setSelectedScheduleDetails(details || []);
    } catch {
      setSelectedScheduleDetails([]);
    }
    setShowDetailModal(true);
  }

  async function handleCreateDetail(payload) {
    if (!selectedScheduleId) {
      alert("Error: no se ha seleccionado un horario válido.");
      return;
    }
    await createScheduleDetail(selectedScheduleId, payload);
    const details = await getScheduleDetails(selectedScheduleId);
    setSelectedScheduleDetails(details || []);
  }

  const filteredSchedules = schedules.filter((sch) =>
    sch.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.content}>
        <h1 className={styles.title}>Horarios Registrados</h1>

        <input
          className={styles.searchInput}
          type="text"
          placeholder="Buscar horario..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button className={styles.btnAdd} onClick={() => setShowForm(true)}>
          + Agregar horario
        </button>

        {loading ? (
          <p className={styles.emptyText}>Cargando...</p>
        ) : (
          <SchedulesList
            schedules={filteredSchedules}
            onDelete={handleDelete}
            onViewDetails={handleOpenDetails}
          />
        )}
      </main>

      {showForm && (
        <ScheduleFormWithDetails
          onSave={handleCreate}
          onCancel={() => {
            setShowForm(false);
            setAddingDetailsInline(false);
            setWeekDay("");
            setCheckIn("");
            setCheckOut("");
            setLunchStart("");
            setLunchEnd("");
          }}
          addingDetailsInline={addingDetailsInline}
          setAddingDetailsInline={setAddingDetailsInline}
          weekDay={weekDay}
          setWeekDay={setWeekDay}
          checkIn={checkIn}
          setCheckIn={setCheckIn}
          checkOut={checkOut}
          setCheckOut={setCheckOut}
          lunchStart={lunchStart}
          setLunchStart={setLunchStart}
          lunchEnd={lunchEnd}
          setLunchEnd={setLunchEnd}
        />
      )}

      {showDetailModal && (
        <ScheduleDetailModal
          scheduleId={selectedScheduleId}
          existingDetails={selectedScheduleDetails}
          onSave={handleCreateDetail}
          onCancel={() => {
            setShowDetailModal(false);
            setSelectedScheduleId(null);
            setSelectedScheduleDetails([]);
          }}
        />
      )}
    </div>
  );
}

function ScheduleFormWithDetails({
  onSave,
  onCancel,
  addingDetailsInline,
  setAddingDetailsInline,
  weekDay,
  setWeekDay,
  checkIn,
  setCheckIn,
  checkOut,
  setCheckOut,
  lunchStart,
  setLunchStart,
  lunchEnd,
  setLunchEnd,
  initial = {},
}) {
  const [name, setName] = useState(initial.name || "");
  const [description, setDescription] = useState(initial.description || "");
  const [isActive, setIsActive] = useState(
    initial.is_active === undefined ? true : initial.is_active
  );

  function handleSubmit(e) {
    e.preventDefault();
    onSave({
      name,
      description,
      is_active: isActive,
    });
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <h2 className={styles.modalTitle}>
          {initial.id ? "Editando Horario" : "Crear Nuevo Horario"}
        </h2>

        <form onSubmit={handleSubmit} className={styles.formBox}>
          <div>
            <label>Nombre del horario</label>
            <input
              type="text"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Estado</label>
            <select
              className={styles.input}
              value={isActive ? "true" : "false"}
              onChange={(e) => setIsActive(e.target.value === "true")}
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>

          <div>
            <label>Descripción</label>
            <textarea
              className={styles.input}
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div style={{ marginTop: 12 }}>
            <label>
              <input
                type="checkbox"
                checked={addingDetailsInline}
                onChange={(e) => setAddingDetailsInline(e.target.checked)}
              />{" "}
              Agregar detalle del horario
            </label>
          </div>

          {addingDetailsInline && (
            <div
              style={{
                marginTop: 15,
                padding: 12,
                border: "1px solid #c20064",
                borderRadius: 8,
                backgroundColor: "#fce4ec",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <h3 style={{ color: "#c20064", marginBottom: 0 }}>Detalle del horario</h3>

              <label>Día de la semana</label>
              <select
                className={styles.input}
                value={weekDay}
                onChange={(e) => setWeekDay(e.target.value)}
                required={addingDetailsInline}
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
                required={addingDetailsInline}
              />

              <label>Salida</label>
              <input
                type="time"
                className={styles.input}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                required={addingDetailsInline}
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

          <div className={styles.formButtons} style={{ marginTop: 15 }}>
            <button type="submit" className={styles.btnSave}>
              Guardar
            </button>
            <button type="button" className={styles.btnCancel} onClick={onCancel}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ScheduleDetailModal({ scheduleId, existingDetails = [], onSave, onCancel }) {
  const [weekDay, setWeekDay] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [lunchStart, setLunchStart] = useState("");
  const [lunchEnd, setLunchEnd] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    await onSave({
      week_day: parseInt(weekDay, 10),
      check_in: checkIn,
      check_out: checkOut,
      lunch_start: lunchStart || null,
      lunch_end: lunchEnd || null,
    });

    // limpiar campos después de guardar
    setWeekDay("");
    setCheckIn("");
    setCheckOut("");
    setLunchStart("");
    setLunchEnd("");
  }

  
  function dayName(num) {
    const days = {
      1: "Lunes",
      2: "Martes",
      3: "Miércoles",
      4: "Jueves",
      5: "Viernes",
      6: "Sábado",
      7: "Domingo",
    };
    return days[num] || "Desconocido";
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox} style={{ maxWidth: 600 }}>
        <h2 className={styles.modalTitle}>Detalles del horario (ID: {scheduleId})</h2>

        {/* Tabla con detalles */}
        {existingDetails.length > 0 ? (
          <table className={styles.table} style={{ marginBottom: 15 }}>
            <thead>
              <tr>
                <th>Día</th>
                <th>Entrada</th>
                <th>Salida</th>
                <th>Inicio comida</th>
                <th>Fin comida</th>
              </tr>
            </thead>
            <tbody>
              {existingDetails.map((d) => (
                <tr key={d.id}>
                  <td>{dayName(d.week_day)}</td>
                  <td>{d.check_in}</td>
                  <td>{d.check_out}</td>
                  <td>{d.lunch_start ?? "—"}</td>
                  <td>{d.lunch_end ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay detalles para este horario.</p>
        )}

        {/* Formulario para agregar detalle nuevo */}
        <form onSubmit={handleSubmit} className={styles.formBox} style={{ marginTop: 10 }}>
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

          <div className={styles.formButtons} style={{ marginTop: 15 }}>
            <button type="submit" className={styles.btnSave}>
              Guardar detalle
            </button>
            <button type="button" className={styles.btnCancel} onClick={onCancel}>
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
