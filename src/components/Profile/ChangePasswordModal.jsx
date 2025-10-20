import React, { useState } from "react";
import { changePassword } from "../../api/users.api";
import Toast from "../../components/Toast";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null); // mensaje global

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setToast(null);

    try {
      const res = await changePassword({ oldPassword, newPassword });
      setToast({ message: res.message || "Contraseña cambiada correctamente", type: "success" });
      setOldPassword("");
      setNewPassword("");
      setTimeout(onClose, 2000);
    } catch (err) {
      setToast({ message: err.message || "Error al cambiar la contraseña", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>Cambiar contraseña</h3>
          <form onSubmit={handleSubmit}>
            <input 
              type="password" 
              placeholder="Contraseña actual" 
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder="Nueva contraseña" 
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              required
            />
            <div className="modal-actions">
              <button type="button" onClick={onClose} className="btn-secondary">
                Cancelar
              </button>
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Cambiando..." : "Cambiar contraseña"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordModal;
