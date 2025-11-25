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
