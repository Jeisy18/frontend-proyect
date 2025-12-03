import React from "react";
import styles from "@/styles/modal.module.css";

export default function Modal({ title, children, onClose }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>{title}</h2>

        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
