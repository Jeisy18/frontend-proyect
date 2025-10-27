export async function changePassword(data) {
  const res = await fetch("http://localhost:3001/users/change-password", {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al cambiar la contraseña");
  }

  return res.json(); // { success: true, message: "Cambio correcto" }
}


export async function getAllUsers() {
  const res = await fetch("http://localhost:3001/users", {
    method: "GET",
    credentials: "include", 
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al obtener usuarios");
  }

  return res.json(); // lista de usuarios
}
