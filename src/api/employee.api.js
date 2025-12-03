const API_URL = "http://localhost:3001/employees";

export async function getAllEmployees() {
  const res = await fetch(`${API_URL}`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Error al obtener empleados");
  return res.json();
}

export async function getEmployeeByMatricula(matricula) {
  const res = await fetch(`${API_URL}/${matricula}`, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Error al obtener empleado");
  return res.json();
}

export async function createEmployee(data, file, embedding) {
  const form = new FormData();
  
  form.append("name", data.name);
  form.append("last_name", data.last_name);
  form.append("matricula", data.matricula);
  form.append("phone", data.phone);
  form.append("facial_vector", JSON.stringify(embedding));
  
  if (file) form.append("file", file); 

  const res = await fetch(`${API_URL}/create`, {
    method: "POST",
    credentials: "include",
    body: form,
  });

  if (!res.ok) throw new Error("Error al crear empleado");
  return res.json();
}

export async function updateEmployee(id, data, file, embedding) {
  const form = new FormData();

  form.append("name", data.name);
  form.append("last_name", data.last_name);
  form.append("matricula", data.matricula);
  form.append("phone", data.phone);
  form.append("facial_vector", JSON.stringify(embedding));

  if (file) form.append("file", file);

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    credentials: "include",
    body: form,
  });

  if (!res.ok) throw new Error("Error al actualizar empleado");
  return res.json();
}


export async function deleteEmployee(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) throw new Error("Error al eliminar empleado");
  return res.json();
}

export async function assignScheduleToEmployee(id, data) {
  const res = await fetch(`${API_URL}/${id}/assign-schedule`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al asignar horario");
  return res.json();
}
