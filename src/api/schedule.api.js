export async function getAllScheduleSets() {
  const res = await fetch("http://localhost:3001/schedule-sets", {
    method: "GET",
    credentials: "include", // pide JWT por cookie HttpOnly
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al obtener todos los horarios disponibles");
  }

  return res.json(); // lista del conjunto de horarios
}

//obtener un horario mediante su ID
export async function getScheduleSetById(id) {
  const res = await fetch(`http://localhost:3001/schedule-sets/${id}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Error al obtener el horario por su ID");
  }

  return res.json();
}

//Crear un nuevo horario 
export async function createScheduleSet(data) {
  const res = await fetch("http://localhost:3001/schedule-sets/create", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al crear un nuevo horario");
  }

  return res.json();
}

export async function updateScheduleSet(id, data) {
  console.log(" UPDATE → ID:", id, "DATA:", data);

  if (!id) {
    throw new Error("El ID es undefined — no se puede actualizar.");
  }

  try {
    const res = await fetch(`http://localhost:3001/schedule-sets/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), 
    });

    if (!res.ok) {
      const error = await res.json().catch(() => null);
      console.error("Error del backend:", error);
      throw new Error(error?.message || "Error en el servidor");
    }

    return res.json();
  } catch (err) {
    console.error(" ERROR DE CONEXIÓN:", err);
    throw new Error("No se pudo conectar al servidor — Failed to fetch");
  }
}


//Eliminar horario selecionado
export async function deleteScheduleSet(id) {
  const res = await fetch(`http://localhost:3001/schedule-sets/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al eliminar este horario");
  }

  return res.json();
}

//Obtener todos los empleados mediante un horario asignado 
export async function getEmployeesByScheduleSet(scheduleSetId) {
  const res = await fetch(`http://localhost:3001/schedule-sets/employee/${scheduleSetId}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Error al obtener los empleados asigandos a ese horario");
  }

  return res.json();
}
