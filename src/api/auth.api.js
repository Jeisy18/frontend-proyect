const API_BASE_URL = "http://localhost:3001";

/* ==========================
   🔐 LOGIN
   ========================== */
export async function loginUser({ email, password }) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    credentials: "include", // ← NECESARIO para recibir cookie HttpOnly
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al iniciar sesión");
  }

  return res.json(); // { message }
}

/* ==========================
   🚪 LOGOUT
   ========================== */
export async function logoutUser() {
  const res = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Error al cerrar sesión");
  }

  return res.json();
}

/* ==========================
   👤 PERFIL ACTUAL
   ========================== */
export async function getProfile() {
  const res = await fetch(`${API_BASE_URL}/users/me`, {
    method: "GET",
    credentials: "include", // ← ENVÍA cookie al backend
  });

  if (!res.ok) {
    throw new Error("No autenticado");
  }

  return res.json();
}

/* ==========================
   👥 OBTENER TODOS LOS EMPLEADOS
   ========================== */
export const getEmployees = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/employees`, {
      method: "GET",
      credentials: "include", // ← SIN ESTO NO ENVÍA LA COOKIE
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Error al obtener empleados");

    return await response.json();
  } catch (error) {
    console.error("ERROR getEmployees:", error);
    return [];
  }
};

/* ==========================
   ➕ CREAR EMPLEADO
   ========================== */
export const createEmployee = async (employeeData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/employees/create`, {
      method: "POST",
      credentials: "include", // ← IMPORTANTE
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData),
    });

    if (!response.ok) throw new Error("Error al crear empleado");

    return await response.json();
  } catch (error) {
    console.error("ERROR createEmployee:", error);
    return null;
  }
};



// export async function loginUser({ email, password }) {
//   const res = await fetch("http://localhost:3001/auth/login", {
//     method: "POST",
//     credentials: "include", // importante para cookies HttpOnly
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });

//   if (!res.ok) {
//     const error = await res.json();
//     throw new Error(error.message || "Error al iniciar sesión");
//   }

//   return res.json(); // { message, user? }
// }

// export async function logoutUser() {
//   const res = await fetch("http://localhost:3001/auth/logout", {
//     method: "POST",
//     credentials: "include",
//   });

//   if (!res.ok) {
//     const error = await res.json();
//     throw new Error(error.message || "Error al cerrar sesión");
//   }

//   return res.json();
// }

// export async function getProfile() {
//   const res = await fetch("http://localhost:3001/users/me", {
//     method: "GET",
//     credentials: "include",
//   });

//   if (!res.ok) {
//     throw new Error("No autenticado");
//   }

//   return res.json(); 
// }
