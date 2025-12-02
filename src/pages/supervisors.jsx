import React, { useEffect, useState } from "react";
import NavbarSupervisor from "@/components/NavbarSupervisor";
import styles from "../styles/users.module.css";

import {
  getAllUsers,
  createUser,
  deactivateUser,
  updateUser,
} from "../api/user.api";

import Toast from "@/components/Toast";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  function showToast(message, type = "success") {
    setToast({ show: true, message, type });
  }

  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    password: "",
    role: "supervisor",
  });

  const [editData, setEditData] = useState({
    id: "",
    name: "",
    last_name: "",
    email: "",
    role: "supervisor",
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleEditChange(e) {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  }

  async function fetchUsers() {
    try {
      const data = await getAllUsers();
      setUsers(data || []);
    } catch (err) {
      console.error("fetchUsers error:", err);
      showToast("Error al obtener usuarios", "error");
      setUsers([]);
    }
  }

  async function handleSubmit() {
    try {
      const payload = { ...formData, role: "supervisor" };
      await createUser(payload);

      showToast("Usuario creado correctamente", "success");
      setShowForm(false);

      setFormData({
        name: "",
        last_name: "",
        email: "",
        password: "",
        role: "supervisor",
      });

      fetchUsers();
    } catch (err) {
      showToast("Error al crear usuario", "error");
    }
  }

  function openEditModal(user) {
    setEditData({
      id: user.id,
      name: user.name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      role: "supervisor",
    });
    setShowEdit(true);
  }

  async function handleEditSubmit() {
    try {
      const payload = {
        name: editData.name,
        last_name: editData.last_name,
        role: "supervisor",
      };

      await updateUser(editData.id, payload);

      showToast("Usuario actualizado", "success");
      setShowEdit(false);
      fetchUsers();
    } catch (err) {
      showToast("Error al actualizar usuario", "error");
    }
  }

  async function handleConfirmDelete() {
    try {
      await deactivateUser(confirmDelete);
      showToast("Usuario eliminado", "success");
      setConfirmDelete(null);
      fetchUsers();
    } catch (err) {
      showToast("Error al eliminar usuario", "error");
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name?.toLowerCase().includes(q) ||
      u.last_name?.toLowerCase().includes(q) ||
      u.email?.toLowerCase().includes(q) ||
      u.id?.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <NavbarSupervisor />
      <div className={styles.container}>
        

        {/* TOAST */}
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ ...toast, show: false })}
          />
        )}

        <div className={styles.headerRow}>
          <h1 className={styles.title}>Usuarios</h1>

          <div className={styles.searchRow}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Buscar por nombre, email o ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button className={styles.addBtn} onClick={() => setShowForm(true)}>
              + Registrar usuario
            </button>
          </div>
        </div>

        {/* TABLA CON SCROLL */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Creado</th>
                <th>Actualizado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.last_name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{new Date(u.created_at || u.createdAt).toLocaleString()}</td>
                  <td>{new Date(u.updated_at || u.updatedAt).toLocaleString()}</td>

                  <td>
                    <button
                      className={styles.smallBtn}
                      onClick={() => openEditModal(u)}
                    >
                      Editar
                    </button>

                    <button
                      className={styles.dangerBtn}
                      onClick={() => setConfirmDelete(u.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL CREAR */}
        {showForm && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Registrar usuario</h2>

              <input
                name="name"
                placeholder="Nombre"
                value={formData.name}
                onChange={handleChange}
              />

              <input
                name="last_name"
                placeholder="Apellido"
                value={formData.last_name}
                onChange={handleChange}
              />

              <input
                name="email"
                placeholder="Correo"
                value={formData.email}
                onChange={handleChange}
              />

              <input
                name="password"
                type="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
              />

              <div style={{ display: "flex", gap: 8 }}>
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
          </div>
        )}

        {/* MODAL EDITAR */}
        {showEdit && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Editar usuario</h2>

              <input
                name="name"
                value={editData.name}
                onChange={handleEditChange}
              />

              <input
                name="last_name"
                value={editData.last_name}
                onChange={handleEditChange}
              />

              <input value={editData.email} disabled />

              <input value="supervisor" disabled />

              <div style={{ display: "flex", gap: 8 }}>
                <button className={styles.addBtn} onClick={handleEditSubmit}>
                  Guardar
                </button>

                <button
                  className={styles.cancel}
                  onClick={() => setShowEdit(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL CONFIRM DELETE */}
        {confirmDelete && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h3>¿Eliminar este usuario?</h3>

              <div style={{ display: "flex", gap: 10 }}>
                <button className={styles.dangerBtn} onClick={handleConfirmDelete}>
                  Sí, eliminar
                </button>

                <button
                  className={styles.cancel}
                  onClick={() => setConfirmDelete(null)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
