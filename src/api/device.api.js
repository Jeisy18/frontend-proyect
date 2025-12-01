const API_URL = "http://localhost:3001/devices";

export async function getAllDevices() {
  const res = await fetch(`${API_URL}`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Error al obtener dispositivos");
  return res.json();
}

export async function searchDevice(name) {
  const res = await fetch(`${API_URL}/search/${name}`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("No encontrado");
  return res.json();
}

export async function createDevice(data) {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear dispositivo");
  return res.json(); // regresa { device, token }
}

export async function deactivateDevice(id) {
  const res = await fetch(`${API_URL}/deactivate/${id}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Error al desactivar dispositivo");
  return res.json();
}
