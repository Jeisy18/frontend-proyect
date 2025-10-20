import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/NavbarSupervisor";
import { AuthContext } from "../context/AuthContext";
import ProfileCard from "../components/Profile/ProfileCard";
import ProfileButtons from "../components/Profile/ProfileButtons";
import EmployeeTable from "../components/Home/EmployeeTable";
import ChangePasswordModal from "../components/Profile/ChangePasswordModal"; // <-- importamos modal

export default function ProfilePage() {
  const { user } = useContext(AuthContext);

  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showActive, setShowActive] = useState(true);
  const [modalOpen, setModalOpen] = useState(false); // <-- estado para modal

  useEffect(() => {
    const fetchEmployees = async () => {
      const data = [
        { id: 1, name: 'Alondra', lastname: 'Cortes', phone: '123456789', photo: '/photos/alondra.jpg' },
        { id: 2, name: 'Juan', lastname: 'Perez', phone: '987654321', photo: '/photos/juan.jpg' }
      ];
      setEmployees(data);
    };
    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.lastname.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesActive = showActive;
    return matchesSearch && matchesActive;
  });

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="main-content">
          <div className="content-wrapper">

            <div className="page-header">
              <h2 className="page-title">Perfil del {user?.role || "admin"}</h2>
              <div className="header-decoration"></div>
            </div>

            <div className="profile-container">
              
              <div className="profile-header">
                <ProfileCard user={user} />
                <div className="profile-actions">
                  {/* pasamos la función para abrir modal */}
                  <ProfileButtons onChangePassword={() => setModalOpen(true)} />
                </div>
              </div>

              <div className="profile-table">
                <h3 className="table-title">Empleados registrados por el usuario</h3>
                <EmployeeTable employees={filteredEmployees} />
              </div>
            </div>
          </div>
        </div>
      </div>

   
      <ChangePasswordModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        userId={user?.id} 
      />
    </>
  );
}
