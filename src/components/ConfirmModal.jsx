import React from "react";
import styles from "../styles/ConfirmModal.module.css";

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <p>{message}</p>
        <div className={styles.modalButtons}>
          <button className={styles.btnConfirm} onClick={onConfirm}>
            Sí, eliminar
          </button>
          <button className={styles.btnCancel} onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
