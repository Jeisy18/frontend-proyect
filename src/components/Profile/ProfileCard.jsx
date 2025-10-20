import React from "react";

const ProfileCard = ({ user }) => {
  if (!user) return null;

  return (
    <div className="profile-card wide">
      <div className="profile-avatar">
        <svg
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>

      <div className="profile-info">
        <h3>{user.name} {user.last_name}</h3>
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Correo:</strong> {user.email}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
