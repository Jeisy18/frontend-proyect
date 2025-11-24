import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { loginUser, logoutUser, getProfile } from "../api/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfile();
        setUser(profile.user || profile);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Función para login
  const login = async ({ email, password }) => {
    try {
      const res = await loginUser({ email, password });
      if (res.message === "Login exitoso") {
        const profile = await getProfile();
        setUser(profile.user || profile);
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Error en login:", err.message);
      throw err;
    }
  };

  // Función para logout
  const logout = async () => {
    try {
      const res = await logoutUser();
      if (res.message === "Logout exitoso" || res.success) {
        setUser(null); // Limpiar contexto
        router.push("/"); // Redirigir al login
      }
    } catch (err) {
      console.error("Error al cerrar sesión:", err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
