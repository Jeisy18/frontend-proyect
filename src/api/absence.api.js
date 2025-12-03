const API_URL = "http://localhost:3001/absences";

export async function getAllAbsences(status = "") {
  const url = status ? `${API_URL}?status=${status}` : API_URL;

  const res = await fetch(url, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Error al obtener ausencias");
  return res.json();
}

export async function getAbsenceById(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Error al obtener ausencia");
  return res.json();
}

export async function getAbsencesByEmployee(employeeId) {
  const res = await fetch(`${API_URL}/employee/${employeeId}`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Error al obtener ausencias del empleado");
  return res.json();
}

export async function createAbsence(data) {
  const res = await fetch(`${API_URL}/create`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear ausencia");
  return res.json();
}

export async function updateAbsence(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al actualizar ausencia");
  return res.json();
}

export async function deleteAbsence(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Error al eliminar ausencia");
  return true;
}
