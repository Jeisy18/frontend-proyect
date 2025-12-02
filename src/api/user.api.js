const API_URL = "http://localhost:3001";

export async function getAllUsers() {
  const res = await fetch(`${API_URL}/users`, {
    credentials: "include",
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Error al obtener usuarios");
  }
  return res.json();
}

export async function createUser(data) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Error" }));
    throw new Error(err.message || "Error al crear usuario");
  }

  return res.json();
}

export async function deactivateUser(id) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Error al desactivar" }));
    throw new Error(err.message || "Error al desactivar usuario");
  }
  return res.json();
}

export async function updateUser(id, data) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Error al actualizar" }));
    throw new Error(err.message || "Error al actualizar usuario");
  }
  return res.json();
}
