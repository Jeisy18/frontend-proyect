import React from "react";

const ProfileButtons = ({ onChangePassword }) => {
  return (
    <div className="profile-buttons">
      <button
        className="btn-secondary"
        onClick={onChangePassword} 
      >
        Cambiar contraseña
      </button>
    </div>
  );
};

export default ProfileButtons;
