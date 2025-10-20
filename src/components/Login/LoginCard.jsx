import React, { useEffect } from "react";
import LoginForm from "./LoginForm";
import LoginIcon from "./LoginIcon";

const LoginCard = () => {
  useEffect(() => {
   
    const inputs = document.querySelectorAll(".form-input");
    inputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.parentElement.style.transform = "scale(1.02)";
      });
      input.addEventListener("blur", () => {
        input.parentElement.style.transform = "scale(1)";
      });
    });
  }, []);

  return (
    <div className="supervisor-login-container">
      <div className="login-card animate-float">
        <div className="login-header">
          <LoginIcon />
          <h1 className="login-title">Portal de Supervisores</h1>
          <p className="login-subtitle">Sistema de Control de Asistencia</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginCard;
