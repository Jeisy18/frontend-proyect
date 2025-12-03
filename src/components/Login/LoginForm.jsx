import { useAuth } from "@/hooks/useAuth";
import React, { useState } from "react";

const LoginForm = () => {
  const { login } = useAuth(); 
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      setError(""); 
    } catch (err) {
      setError(err.message); 
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="email">
          Correo electrónico
        </label>
        <div className="input-wrapper">
          <span className="input-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m22 7l-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                <rect x="2" y="4" rx="2" width="20" height="16"></rect>
              </g>
            </svg>
          </span>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="supervisor@empresa.com"
            required
            className="form-input"
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="password">
          Contraseña
        </label>
        <div className="input-wrapper">
          <span className="input-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" rx="2" ry="2" width="18" height="11"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </g>
            </svg>
          </span>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            className="form-input"
          />
        </div>
      </div>

      <button className="login-button" type="submit">
        <span>Iniciar sesión</span>
        <div className="login-button-shine"></div>
      </button>
    </form>
  );
};

export default LoginForm;
