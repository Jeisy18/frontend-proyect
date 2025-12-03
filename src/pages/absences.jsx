import React, { useEffect, useState } from "react";
import NavbarSupervisor from "@/components/NavbarSupervisor";
import styles from "@/styles/absences.module.css";

import {
  getAllAbsences,
  createAbsence,
  updateAbsence,
  deleteAbsence,
} from "@/api/absence.api";

import AbsenceForm from "@/components/Absences/AbsenceForm";
import AbsenceTable from "@/components/Absences/AbsenceTable";
import Modal from "@/components/Absences/Modal";
import Toast from "@/components/Toast";

export default function AbsencesPage() {
  const [absences, setAbsences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);

  const [filterMatricula, setFilterMatricula] = useState("");

  async function loadAbsences() {
    try {
      setLoading(true);
      const data = await getAllAbsences();
      setAbsences(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      showToast(err.message, "error");
    } finally {
      setLoading(false);
    }
  }

  function showToast(message, type = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  useEffect(() => {
    loadAbsences();
  }, []);

  async function handleCreate(data) {
    await createAbsence(data);
    showToast("Ausencia creada con éxito");
    loadAbsences();
  }

  async function handleUpdate(id, data) {
    await updateAbsence(id, data);
    showToast("Ausencia actualizada");
    loadAbsences();
  }

  async function handleDelete(id) {
    try {
      await deleteAbsence(id);
      showToast("Ausencia eliminada");
      loadAbsences();
    } catch (err) {
      showToast("Error al eliminar", "error");
    }
  }

  const filteredAbsences = absences.filter((a) =>
    filterMatricula ? a.employeeId == filterMatricula : true
  );

  return (
    <>
      <NavbarSupervisor />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Ausencias</h1>

          {/* FILTRO */}
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Filtrar por matrícula..."
            value={filterMatricula}
            onChange={(e) => setFilterMatricula(e.target.value)}
          />

          <button
            className={styles.btnAdd}
            onClick={() => {
              setEditing(null);
              setShowModal(true);
            }}
          >
            + Registrar Ausencia
          </button>

          {/* MODAL */}
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <AbsenceForm
                initialData={editing}
                onCancel={() => setShowModal(false)}
                onSaved={() => {
                  setShowModal(false);
                  setEditing(null);
                  loadAbsences();
                }}
                createAbsence={handleCreate}
                updateAbsence={handleUpdate}
              />
            </Modal>
          )}

          {/* TABLA */}
          {loading ? (
            <p>Cargando ausencias...</p>
          ) : (
            <AbsenceTable
              absences={filteredAbsences}
              onEdit={(a) => {
                setEditing(a);
                setShowModal(true);
              }}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </>
  );
}
