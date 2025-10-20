

export async function loginUser({ email, password }) {
  const res = await fetch("http://localhost:3001/auth/login", {
    method: "POST",
    credentials: "include", // importante para cookies HttpOnly
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al iniciar sesión");
  }

  return res.json(); // { message, user? }
}

export async function logoutUser() {
  const res = await fetch("http://localhost:3001/auth/logout", {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al cerrar sesión");
  }

  return res.json();
}

export async function getProfile() {
  const res = await fetch("http://localhost:3001/users/me", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("No autenticado");
  }

  return res.json(); 
}
