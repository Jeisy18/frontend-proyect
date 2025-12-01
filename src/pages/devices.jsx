import React, { useEffect, useState } from "react";
import {
  getAllDevices,
  createDevice,
  deactivateDevice,
} from "../api/device.api";

import NavbarSupervisor from "@/components/NavbarSupervisor";
import styles from "../styles/devices.module.css";

export default function DevicesPage() {
  const [devices, setDevices] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    device_id: "",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function fetchDevices() {
    try {
      const data = await getAllDevices();
      setDevices(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit() {
    try {
      const result = await createDevice(formData);
      alert(`Dispositivo creado. Token:\n${result.token}`);
      setShowForm(false);
      setFormData({ name: "", device_id: "" });
      fetchDevices();
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  async function handleDeactivate(id) {
    if (!confirm("¿Desactivar este dispositivo?")) return;

    try {
      await deactivateDevice(id);
      fetchDevices();
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  useEffect(() => {
    fetchDevices();
  }, []);

  const filtered = devices.filter(
    (d) =>
      d.name?.toLowerCase().includes(search.toLowerCase()) ||
      d.device_id?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <NavbarSupervisor />
      <div className={styles.container}>
        

        <h1 className={styles.title}>Dispositivos</h1>

        <div className={styles.searchRow}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Buscar por nombre o ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button className={styles.addBtn} onClick={() => setShowForm(true)}>
            + Registrar dispositivo
          </button>
        </div>

        <div className={styles.grid}>
          {filtered.map((d) => (
            <div
              key={d.id}
              className={`${styles.card} ${
                d.is_active ? styles.active : styles.inactive
              }`}
            >
              <h3>{d.name || "Sin nombre"}</h3>

              <p><strong>ID:</strong> {d.device_id}</p>

              <p>
                <strong>Estado:</strong> {d.is_active ? "Activo" : "Inactivo"}
              </p>

              <p>
                <strong>Última conexión:</strong><br />
                {new Date(d.last_seen_at).toLocaleString()}
              </p>

              {/* botón solo si está activo */}
              {d.is_active && (
                <button
                  className={`${styles.actionBtn} ${styles.deactivate}`}
                  onClick={() => handleDeactivate(d.id)}
                >
                  Desactivar
                </button>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className={styles.emptyText}>No hay dispositivos registrados.</p>
        )}

        {showForm && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2 className={styles.titles}>Nuevo dispositivo</h2>

              <input
                name="name"
                placeholder="Nombre del dispositivo"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                name="device_id"
                placeholder="ID físico del dispositivo"
                value={formData.device_id}
                onChange={handleChange}
              />

              <button className={styles.addBtn} onClick={handleSubmit}>
                Registrar
              </button>

              <button
                className={styles.cancel}
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
