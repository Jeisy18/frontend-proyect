import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";

const Navbar = () => {
  const [showConfigMenu, setShowConfigMenu] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();

  const panelTitle =
    user?.role === "admin" ? "Panel de Administrador" : "Panel de Supervisores";

  return (
    <nav className="navbar-supervisor">
      <div className="navbar-content">
        <div className="navbar-brand">
          <div className="brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24">
              <g
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3.128a4 4 0 0 1 0 7.744M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <circle r="4" cx="9" cy="7"></circle>
              </g>
            </svg>
          </div>
          <span className="brand-text">{panelTitle}</span>
        </div>

        <ul className="navbar-menu">
          {/* Inicio */}
          <li
            className={`nav-item ${
              router.pathname === "/dashboard" ? "active" : ""
            }`}
            onClick={() => router.push("/dashboard")}
          >
            <div className="nav-link">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </g>
              </svg>
              <span>Inicio</span>
            </div>
          </li>
          {/* Ausencias */}
          <li
            className={`nav-item ${
              router.pathname === "/absences" ? "active" : ""
            }`}
            onClick={() => router.push("/absences")}
          >
            <div className="nav-link">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12a9 9 0 1 1-18 0a9 9 0 0 1 18 0Z" />
                  <path d="M12 7v5l3 2" />
                </g>
              </svg>
              <span>Ausencias</span>
            </div>
          </li>

          {/* Estadísticas (solo admins) */}
          {user?.role === "admin" && (
            <li
              className={`nav-item ${
                router.pathname === "/statistics" ? "active" : ""
              }`}
              onClick={() => router.push("/statistics")}
            >
              <div className="nav-link">
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3v16a2 2 0 0 0 2 2h16"></path>
                    <path d="m19 9-5 5-4-4-3 3"></path>
                  </g>
                </svg>
                <span>Estadísticas</span>
              </div>
            </li>
          )}

          {/* Mini menú configuración */}
          <li className="nav-item" style={{ position: "relative" }}>
            <div
              className="nav-link"
              onClick={() => setShowConfigMenu(!showConfigMenu)}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0a2.34 2.34 0 0 0 3.319 1.915a2.34 2.34 0 0 1 2.33 4.033a2.34 2.34 0 0 0 0 3.831a2.34 2.34 0 0 1-2.33 4.033a2.34 2.34 0 0 0-3.319 1.915a2.34 2.34 0 0 1-4.659 0a2.34 2.34 0 0 0-3.32-1.915a2.34 2.34 0 0 1-2.33-4.033a2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path>
                  <circle r="3" cx="12" cy="12"></circle>
                </g>
              </svg>
              <span>Configuración</span>
            </div>

            {showConfigMenu && (
              <ul className="config-menu">
                <li onClick={() => router.push("/profile")}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Mi perfil
                </li>
                <li onClick={logout}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                  Cerrar sesión
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
